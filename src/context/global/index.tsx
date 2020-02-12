import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloDynamicLinkContext,
  DynamicLinkSrv
} from '../../util/apollo/dynamicLink';
import { ProvideActionCtx } from './actionCtx';
import { ProvideAlgoliaContext } from './algolia';
import { ProvideLocalizationCtx } from './localizationCtx';
import { ProvideSessionCtx } from './sessionCtx';
import { ProvideStateCtx } from './stateCtx';
import { ProvideStoreCtx, StoreContextT } from './storeCtx';

interface Props {
  children: React.ReactNode;
  store: StoreContextT;
  dynamicLinkSrv: DynamicLinkSrv;
}
export const ProvideContexts: React.FC<Props> = ({
  children,
  store,
  dynamicLinkSrv
}) => {
  return (
    <ProvideStoreCtx store={store}>
      <ProvideStateCtx>
        <ProvideActionCtx>
          <ProvideLocalizationCtx>
            <ProvideSessionCtx>
              <ApolloDynamicLinkContext.Provider value={dynamicLinkSrv}>
                <BrowserRouter>
                  <ProvideAlgoliaContext>{children}</ProvideAlgoliaContext>
                </BrowserRouter>
              </ApolloDynamicLinkContext.Provider>
            </ProvideSessionCtx>
          </ProvideLocalizationCtx>
        </ProvideActionCtx>
      </ProvideStateCtx>
    </ProvideStoreCtx>
  );
};
