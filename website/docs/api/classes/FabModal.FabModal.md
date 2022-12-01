[fabwindow](../README.md) / [Modules](../modules.md) / [FabModal](../modules/FabModal.md) / FabModal

# Class: FabModal

[FabModal](../modules/FabModal.md).FabModal

## Table of contents

### Constructors

- [constructor](FabModal.FabModal.md#constructor)

### Properties

- [$body](FabModal.FabModal.md#$body)
- [$bodyElement](FabModal.FabModal.md#$bodyelement)
- [$close](FabModal.FabModal.md#$close)
- [$el](FabModal.FabModal.md#$el)
- [$expand](FabModal.FabModal.md#$expand)
- [$header](FabModal.FabModal.md#$header)
- [$icons](FabModal.FabModal.md#$icons)
- [$loader](FabModal.FabModal.md#$loader)
- [$modalTab](FabModal.FabModal.md#$modaltab)
- [$overlay](FabModal.FabModal.md#$overlay)
- [$reduce](FabModal.FabModal.md#$reduce)
- [$title](FabModal.FabModal.md#$title)
- [isFullScreen](FabModal.FabModal.md#isfullscreen)
- [oldContent](FabModal.FabModal.md#oldcontent)
- [options](FabModal.FabModal.md#options)

### Accessors

- [active](FabModal.FabModal.md#active)
- [content](FabModal.FabModal.md#content)
- [index](FabModal.FabModal.md#index)
- [modalTab](FabModal.FabModal.md#modaltab)
- [modal\_manager](FabModal.FabModal.md#modal_manager)
- [title](FabModal.FabModal.md#title)

### Methods

- [\_fnDown](FabModal.FabModal.md#_fndown)
- [close](FabModal.FabModal.md#close)
- [createModal](FabModal.FabModal.md#createmodal)
- [destroy](FabModal.FabModal.md#destroy)
- [hide](FabModal.FabModal.md#hide)
- [restoreOldContent](FabModal.FabModal.md#restoreoldcontent)
- [show](FabModal.FabModal.md#show)
- [startLoader](FabModal.FabModal.md#startloader)
- [stopLoader](FabModal.FabModal.md#stoploader)
- [toggleFullScreen](FabModal.FabModal.md#togglefullscreen)

## Constructors

### constructor

• **new FabModal**(`options?`)

Instance of FabModal

**`Default Value`**

```javascript
const options = {
 id: `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}`,
  title: "",
  content: "",
  modal_manager: undefined,
  effects: {
    in: "fade-in",
    out: "fade-out",
  },
  overlay: true,
  zIndex: 999,
  width: "auto",
  height: "auto",
  minWidth: "200px",
  minHeight: "150px",
  maxWidth: "100%",
  maxHeight: "100%",
  draggable: true,
  expandable: true,
  reducible: true,

  onFullScreen: null,
  onRestore: null,
  onResize: null,
  onShow: null,
  onHide: null,
  beforeClose: null,
  onClosing: null,
  onClosed: null,
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `ModalOptions` | Object contains options for modal  See : modalDefaultOptions |

#### Defined in

[FabModal.ts:105](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L105)

## Properties

### $body

• **$body**: `HTMLElement`

**`Property`**

content modal html element

#### Defined in

[FabModal.ts:55](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L55)

___

### $bodyElement

• `Protected` **$bodyElement**: `HTMLElement`

#### Defined in

[FabModal.ts:36](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L36)

___

### $close

• **$close**: `HTMLButtonElement`

**`Property`**

button html element

#### Defined in

[FabModal.ts:53](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L53)

___

### $el

• **$el**: `HTMLDivElement`

**`Property`**

html element

#### Defined in

[FabModal.ts:41](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L41)

___

### $expand

• **$expand**: `HTMLButtonElement`

**`Property`**

button html element

#### Defined in

[FabModal.ts:51](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L51)

___

### $header

• **$header**: `HTMLElement`

**`Property`**

modal html element

#### Defined in

[FabModal.ts:43](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L43)

___

### $icons

• **$icons**: `HTMLElement`

**`Property`**

buttons modal html element

#### Defined in

[FabModal.ts:47](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L47)

___

### $loader

• **$loader**: `HTMLElement`

**`Property`**

modal html element

#### Defined in

[FabModal.ts:57](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L57)

___

### $modalTab

• **$modalTab**: `HTMLElement`

**`Property`**

tab element (only if using with FabModalManager)

#### Defined in

[FabModal.ts:59](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L59)

___

### $overlay

• **$overlay**: `HTMLElement`

**`Property`**

html element of simple modal

#### Defined in

[FabModal.ts:39](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L39)

___

### $reduce

• **$reduce**: `HTMLButtonElement`

**`Property`**

button modal html element

#### Defined in

[FabModal.ts:49](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L49)

___

### $title

• **$title**: `HTMLElement`

**`Property`**

modal html element

#### Defined in

[FabModal.ts:45](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L45)

___

### isFullScreen

• **isFullScreen**: `boolean`

**`Property`**

called if modal is fullScreen or not

#### Defined in

[FabModal.ts:32](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L32)

___

### oldContent

• **oldContent**: `string`

**`Property`**

stock content before set new content to modal

#### Defined in

[FabModal.ts:34](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L34)

___

### options

• **options**: `ModalOptions`

#### Defined in

[FabModal.ts:30](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L30)

## Accessors

### active

• `get` **active**(): `boolean`

**`Getter`**

Get if modal is active or not

#### Returns

`boolean`

#### Defined in

[FabModal.ts:231](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L231)

• `set` **active**(`active`): `void`

**`Setter`**

Set active class to modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`

#### Defined in

[FabModal.ts:217](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L217)

___

### content

• `get` **content**(): ``null`` \| `string`

**`Getter`**

Get body content of modal

#### Returns

``null`` \| `string`

#### Defined in

[FabModal.ts:168](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L168)

• `set` **content**(`content`): `void`

**`Setter`**

Set body content of modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | ``null`` \| `string` |

#### Returns

`void`

#### Defined in

[FabModal.ts:175](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L175)

___

### index

• `get` **index**(): `string`

**`Setter`**

Set z-index of modal

#### Returns

`string`

#### Defined in

[FabModal.ts:189](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L189)

• `set` **index**(`index`): `void`

**`Setter`**

Set z-index of modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `string` |

#### Returns

`void`

#### Defined in

[FabModal.ts:196](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L196)

___

### modalTab

• `get` **modalTab**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[FabModal.ts:242](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L242)

• `set` **modalTab**(`modalTab`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modalTab` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[FabModal.ts:235](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L235)

___

### modal\_manager

• `get` **modal_manager**(): `undefined` \| [`FabModalManager`](FabModalManager.FabModalManager.md)

**`Getter`**

get modal manager object

#### Returns

`undefined` \| [`FabModalManager`](FabModalManager.FabModalManager.md)

#### Defined in

[FabModal.ts:203](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L203)

• `set` **modal_manager**(`obj`): `void`

**`Setter`**

Set modal manager object

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `undefined` \| [`FabModalManager`](FabModalManager.FabModalManager.md) |

#### Returns

`void`

#### Defined in

[FabModal.ts:210](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L210)

___

### title

• `get` **title**(): ``null`` \| `string`

**`Getter`**

get title of modal

#### Returns

``null`` \| `string`

#### Defined in

[FabModal.ts:150](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L150)

• `set` **title**(`title`): `void`

**`Setter`**

Set title of modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | ``null`` \| `string` |

#### Returns

`void`

#### Defined in

[FabModal.ts:157](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L157)

## Methods

### \_fnDown

▸ `Private` **_fnDown**(`ev`): `undefined` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `ev` | `MouseEvent` |

#### Returns

`undefined` \| ``false``

#### Defined in

[FabModal.ts:934](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L934)

___

### close

▸ **close**(): `void`

**`Function`**

Closing current modal

#### Returns

`void`

#### Defined in

[FabModal.ts:1150](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1150)

___

### createModal

▸ **createModal**(): `void`

**`Function`**

Create all node elements of modal

**`Note`**

Useless to call this function without calling instance new FabModal()

#### Returns

`void`

#### Defined in

[FabModal.ts:982](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L982)

___

### destroy

▸ **destroy**(): `void`

**`Function`**

Removing modal from DOM, you cannot retrieve modal after this

#### Returns

`void`

#### Defined in

[FabModal.ts:1170](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1170)

___

### hide

▸ **hide**(): `void`

**`Function`**

Hide current modal

#### Returns

`void`

#### Defined in

[FabModal.ts:1101](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1101)

___

### restoreOldContent

▸ **restoreOldContent**(): `void`

**`Function`**

Restore old content into modal (the one to save before set new content)

#### Returns

`void`

#### Defined in

[FabModal.ts:1073](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1073)

___

### show

▸ **show**(): `void`

**`Function`**

show current modal

#### Returns

`void`

#### Defined in

[FabModal.ts:1081](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1081)

___

### startLoader

▸ **startLoader**(): `void`

**`Function`**

Starting loader into modal

#### Returns

`void`

#### Defined in

[FabModal.ts:1056](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1056)

___

### stopLoader

▸ **stopLoader**(): `void`

**`Function`**

Stop loader into modal

#### Returns

`void`

#### Defined in

[FabModal.ts:1065](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1065)

___

### toggleFullScreen

▸ **toggleFullScreen**(): `boolean`

**`Function`**

Toggle fullScreen

#### Returns

`boolean`

#### Defined in

[FabModal.ts:1113](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModal.ts#L1113)
