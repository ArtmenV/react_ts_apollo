// const util = require('util')
const visitor_plugin_common_1 = require('@graphql-codegen/visitor-plugin-common');
const autoBind = require('auto-bind');
const graphql = require('graphql');

class ReactApolloVisitor extends visitor_plugin_common_1.ClientSideBaseVisitor {
  constructor(schema, fragments, rawConfig, documents) {
    super(schema, fragments, rawConfig, {});
    // this._documents = documents;
    this.defs = [];
    autoBind(this);
  }
  buildOperation(
    node,
    documentVariableName,
    operationType,
    operationResultType,
    operationVariablesTypes
  ) {
    this.defs.push({
      name: node.name.value,
      operationType,
      operationResultType,
      operationVariablesTypes
    });
    return '';
  }
}
exports.plugin = (schema, documents, config) => {
  const allAst = graphql.concatAST(documents.map(v => v.content));
  const allFragments = [
    ...allAst.definitions
      .filter(d => d.kind === graphql.Kind.FRAGMENT_DEFINITION)
      .map(fragmentDef => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false
      })),
    ...(config.externalFragments || [])
  ];
  const visitor = new ReactApolloVisitor(
    schema,
    allFragments,
    config,
    documents
  );
  graphql.visit(allAst, { leave: visitor });
  // console.log('\n\n***',util.inspect(visitor.defs,false, 100,true),'\n\n***')

  return visitor.defs
    .map(
      def => `

export interface ${def.operationResultType}Operation {
  operationName: '${def.name}'
  result: ${def.operationResultType}
  variables: ${def.operationVariablesTypes}
  type: '${def.operationType.toLocaleLowerCase()}'
}
`
    )
    .join('');
};
