/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { genStyleHook } from '@nocobase/client';

export const useStyles = genStyleHook('nb-mobile-tab-bar', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      boxSizing: 'border-box',
      borderTop: `1px solid ${token.colorBorder}`,
      backgroundColor: token.colorBgBase,

      '.mobile-tab-bar-content': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: token.size,
        height: '100%',
        minHeight: 56,
        paddingInline: token.paddingSM,
      },

      '.mobile-tab-bar-list': {
        display: 'flex',
        justifyContent: 'space-around',
        flex: 1,
        alignItems: 'center',
        overflowX: 'auto',
        '.adm-tab-bar-item': {
          maxWidth: '100%',
          color: token.colorTextSecondary,
          '--adm-color-primary': token.colorPrimary,
          '--adm-color-background': token.colorBgBase,
          '--adm-color-weak': token.colorTextTertiary,
          '--adm-border-color': token.colorBorder,
          '&.adm-tab-bar-item-active': {
            color: token.colorPrimary,
          },
          '.adm-tab-bar-item-title': {
            maxWidth: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            fontSize: token.fontSizeSM,
          },
        },
        '&>div': {
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.ant-btn-icon': {
          marginInlineEnd: '0 !important',
        },
      },

      // subtle shadow to float above content, Slack-like
      boxShadow: `0 -4px 12px rgba(0,0,0,0.04)`,
    },
  };
});
