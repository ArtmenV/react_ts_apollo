export const ACTION_SYMBOL_PROP = Symbol();

const REGISTERED_TYPE_NAMES = new Set<string>();

interface Action<T extends string, P> {
  type: T;
  payload: P;
  meta: {
    readonly [ACTION_SYMBOL_PROP]: Symbol;
  };
}
interface ActionCtx<
  T extends string,
  P,
  C extends Creator<P, any> | undefined
> {
  create: (createPayload: CreatePOf<P, C>) => Action<T, P>;
  is: (_: any) => _ is Action<T, P>;
  case: <State>(
    reducer: (oldState: State, p: P) => State
  ) => (oldState: State, a: any) => State;
}

export type Creator<P, CP> = (_: CP) => P;
export type CreatePOf<
  P,
  C extends Creator<P, any> | undefined
> = C extends Creator<P, infer CP> ? CP : P;
export const actionCtx = <
  T extends string,
  P,
  C extends Creator<P, any> | undefined = undefined
>(
  type: T,
  creator?: C
): ActionCtx<T, P, C> => {
  if (REGISTERED_TYPE_NAMES.has(type)) {
    console.warn(`makeAction: type:[${type}] already declared`);
  }
  const ACTION_SYMBOL = Symbol(`${type}`);

  const create: ActionCtx<T, P, C>['create'] = _payload => {
    const payload = creator ? creator(_payload) : _payload;
    return {
      type,
      payload,
      meta: {
        [ACTION_SYMBOL_PROP]: ACTION_SYMBOL
      }
    };
  };
  const is: ActionCtx<T, P, C>['is'] = (_: any): _ is Action<T, P> =>
    !!_ && 'meta' in _ && _.meta[ACTION_SYMBOL_PROP] === ACTION_SYMBOL;
  const _case: ActionCtx<T, P, C>['case'] = <State>(
    reducer: (oldState: State, p: P) => State
  ) => (oldState: State, a: any) => {
    if (is(a)) {
      return reducer(oldState, a.payload);
    }
    return oldState;
  };
  return {
    create,
    case: _case,
    is
  };
};

export type PayloadOf<
  Ctx extends ActionCtx<any, any, any>
> = Ctx extends ActionCtx<any, infer P, any> ? P : never;
// declare const incase = <S>(a:ActionCtx<any,S>, )=>{incase:typeof incase, return: (oldState: S, p: any) => S}

// incase(act1, red1)
// .incase(act2, red2)
// .incase(act3, red3)
// .return()

// export const oncase = <
//   AC extends ActionCtx<P>,
//   State,
//   P = AC extends ActionCtx<infer P> ? P : never
// >(ctx: AC, reducer: (oldState: State, p: P) => State) =>
//   (oldState: State, a: any) => {
//     if (ctx.is(a)) {
//       return reducer(oldState, a.payload)
//     }
//     return oldState
//   }

// const actX = actionCtx<'x', { a: number }>('x')
// const act = actX.create({ a: 21 })
// console.log('act', act)
// act.type
// act.payload
// const red = actX.case((s: { b: number }, p) => {
//   return {
//     ...s,
//     b: s.b + p.a
//   }
// })

// const r = red({ b: 3 }, {})
// console.log('r', r)
// if (actX.is(act)) {
//   console.log('act is actX', act)
// } else {
// }

// const zc = (_: number) => ({ a: `${_}` })
// const actZ = actionCtx<'s', { a: string }, typeof zc>('s', zc)

// const c = actZ.create(1)
// c
// if (!actX.is(c)) {
//   console.log('c is  nmot actX', c)
// }

// if (!actZ.is(c)) {
//   console.log('c is actZ', c)
// }
