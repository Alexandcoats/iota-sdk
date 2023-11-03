// Copyright 2023 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { Type } from 'class-transformer';
import { Ed25519Signature } from '../../signature';

/**
 * All of the unlock types.
 */
enum UnlockType {
    /**
     * A signature unlock.
     */
    Signature = 0,
    /**
     * A reference unlock.
     */
    Reference = 1,
    /**
     *  An account unlock.
     */
    Account = 2,
    /**
     *  An Anchor unlock.
     */
    Anchor = 3,
    /**
     *  An NFT unlock.
     */
    Nft = 4,
}

/**
 * The base class for unlocks.
 */
abstract class Unlock {
    /**
     * The type of unlock.
     */
    readonly type: UnlockType;

    /**
     * @param type The type of unlock.
     */
    constructor(type: UnlockType) {
        this.type = type;
    }
}

/**
 * An unlock holding one or more signatures unlocking one or more inputs..
 */
class SignatureUnlock extends Unlock {
    /**
     * The signature.
     */
    @Type(() => Ed25519Signature)
    readonly signature: Ed25519Signature;

    /**
     * @param signature An Ed25519 signature.
     */
    constructor(signature: Ed25519Signature) {
        super(UnlockType.Signature);
        this.signature = signature;
    }
}

/**
 * An unlock which must reference a previous unlock which unlocks
 * also the input at the same index as this Reference Unlock.
 */
class ReferenceUnlock extends Unlock {
    /**
     * The reference.
     */
    readonly reference: number;

    /**
     * @param reference An index referencing a previous unlock.
     */
    constructor(reference: number) {
        super(UnlockType.Reference);
        this.reference = reference;
    }
}

/**
 * An unlock which must reference a previous unlock which unlocks the account that the input is locked to.
 */
class AccountUnlock extends Unlock {
    /**
     * The reference.
     */
    readonly reference: number;

    /**
     * @param reference An index referencing a previous unlock.
     */
    constructor(reference: number) {
        super(UnlockType.Account);
        this.reference = reference;
    }
}

/**
 * An unlock which must reference a previous unlock which unlocks the anchor that the input is locked to.
 */
class AnchorUnlock extends Unlock {
    /**
     * The reference.
     */
    readonly reference: number;

    /**
     * @param reference An index referencing a previous unlock.
     */
    constructor(reference: number) {
        super(UnlockType.Anchor);
        this.reference = reference;
    }
}

/**
 * An unlock which must reference a previous unlock which unlocks the NFT that the input is locked to.
 */
class NftUnlock extends Unlock {
    /**
     * The reference.
     */
    readonly reference: number;

    /**
     * @param reference An index referencing a previous unlock.
     */
    constructor(reference: number) {
        super(UnlockType.Nft);
        this.reference = reference;
    }
}

const UnlockDiscriminator = {
    property: 'type',
    subTypes: [
        {
            value: SignatureUnlock,
            name: UnlockType.Signature as any,
        },
        {
            value: ReferenceUnlock,
            name: UnlockType.Reference as any,
        },
        {
            value: AccountUnlock,
            name: UnlockType.Account as any,
        },
        {
            value: AnchorUnlock,
            name: UnlockType.Anchor as any,
        },
        {
            value: NftUnlock,
            name: UnlockType.Nft as any,
        },
    ],
};

export {
    UnlockType,
    Unlock,
    SignatureUnlock,
    ReferenceUnlock,
    AccountUnlock,
    AnchorUnlock,
    NftUnlock,
    UnlockDiscriminator,
};