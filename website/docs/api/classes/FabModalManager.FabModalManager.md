[fabwindow](../README.md) / [Modules](../modules.md) / [FabModalManager](../modules/FabModalManager.md) / FabModalManager

# Class: FabModalManager

[FabModalManager](../modules/FabModalManager.md).FabModalManager

## Table of contents

### Constructors

- [constructor](FabModalManager.FabModalManager.md#constructor)

### Properties

- [$bodyElement](FabModalManager.FabModalManager.md#$bodyelement)
- [$modalContainer](FabModalManager.FabModalManager.md#$modalcontainer)
- [modals](FabModalManager.FabModalManager.md#modals)
- [options](FabModalManager.FabModalManager.md#options)

### Methods

- [addModal](FabModalManager.FabModalManager.md#addmodal)
- [createModal](FabModalManager.FabModalManager.md#createmodal)
- [destroyModal](FabModalManager.FabModalManager.md#destroymodal)
- [setFocused](FabModalManager.FabModalManager.md#setfocused)

## Constructors

### constructor

• **new FabModalManager**(`options?`)

Instance of FabModalManager
See : FabModalManager.defaultOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ModalManagerOptions` |

#### Defined in

[FabModalManager.ts:28](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L28)

## Properties

### $bodyElement

• **$bodyElement**: `HTMLElement`

#### Defined in

[FabModalManager.ts:22](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L22)

___

### $modalContainer

• **$modalContainer**: `HTMLDivElement`

#### Defined in

[FabModalManager.ts:21](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L21)

___

### modals

• **modals**: [`FabModal`](FabModal.FabModal.md)[]

#### Defined in

[FabModalManager.ts:17](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L17)

___

### options

• **options**: `ModalManagerOptions`

#### Defined in

[FabModalManager.ts:18](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L18)

## Methods

### addModal

▸ **addModal**(`modal`): [`FabModal`](FabModal.FabModal.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `modal` | [`FabModal`](FabModal.FabModal.md) |

#### Returns

[`FabModal`](FabModal.FabModal.md)

#### Defined in

[FabModalManager.ts:106](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L106)

___

### createModal

▸ **createModal**(`options?`): [`FabModal`](FabModal.FabModal.md)

**`Function`**

creating new instance of FabModal

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ModalOptions` |

#### Returns

[`FabModal`](FabModal.FabModal.md)

#### Defined in

[FabModalManager.ts:94](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L94)

___

### destroyModal

▸ **destroyModal**(`fabModal`): `void`

**`Function`**

Destroy the modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `fabModal` | [`FabModal`](FabModal.FabModal.md) |

#### Returns

`void`

#### Defined in

[FabModalManager.ts:148](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L148)

___

### setFocused

▸ **setFocused**(`ev`): `void`

**`Function`**

Set the focus to modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `ev` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[FabModalManager.ts:129](https://github.com/fabienwnklr/FabModal-2.0/blob/6bc66c2/lib/FabModalManager.ts#L129)
