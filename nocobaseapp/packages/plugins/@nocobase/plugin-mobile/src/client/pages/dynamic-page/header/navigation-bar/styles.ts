/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { genStyleHook } from '@nocobase/client';

export const useStyles = genStyleHook('nb-mobile-page-navigation-bar', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '.adm-nav-bar': {
        maxWidth: '100%',
        height: 56,
        overflow: 'hidden',
        backgroundColor: token.colorBgBase,
        borderBottom: `1px solid ${token.colorBorder}`,

        '.adm-nav-bar-left': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        '.adm-nav-bar-right': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },

        '.adm-nav-bar-title': {
          fontWeight: 700,
          color: token.colorText,
        },

        'button, .ant-btn': {
          color: token.colorPrimary,
        },
      },
    },
  };
});
