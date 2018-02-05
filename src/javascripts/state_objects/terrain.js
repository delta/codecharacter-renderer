import * as PIXI from 'pixi.js';
import StateObject from './stateobject';
import GraphicsPrimitive from './graphicsprimitive';

export default class TerrainElement extends StateObject {
    constructor(x, y) {
        super(x, y, TerrainElement.sideLength, TerrainElement.sideLength, TerrainElement.textures.standardTexture);

        this.playerID = 0;
        this.nearbyTowers = { 1: {}, 2: {} };

        this.overlay = new GraphicsPrimitive(x, y, TerrainElement.sideLength, TerrainElement.sideLength);
    }

    addOwnership(playerID, towerID) {
        this.addTower(playerID, towerID);

        if (this.playerID == playerID || this.playerID == 3)
            return;

        if (this.playerID === 0)
            this.playerID = playerID;
        else this.playerID = 3;

        TerrainElement.addOwnership(playerID);
        // this.overlay.fill(this.playerID);
        let spriteDetails = TerrainElement.getSpriteDetails(this.playerID);
        this.sprite.texture = spriteDetails.texture;
    }

    removeOwnership(playerID, towerID) {
        if (this.playerID == 0 || (this.playerID != 3 && this.playerID != playerID))
            return;

        this.removeTower(playerID, towerID);

        if ( Object.keys(this.getNearbyTowers(playerID)).length === 0 ) {
            TerrainElement.removeOwnership(playerID);
            this.playerID -= playerID;
            // this.overlay.fill(this.playerID);
            let spriteDetails = TerrainElement.getSpriteDetails(this.playerID);
            this.sprite.texture = spriteDetails.texture;
        }
    }

    addTower(playerID, towerID) {
        this.nearbyTowers[playerID][towerID] = null;
    }

    removeTower(playerID, towerID) {
        delete this.nearbyTowers[playerID][towerID];
    }

    getNearbyTowers(playerID) {
        return this.nearbyTowers[playerID];
    }


    static createOwnershipObject() {
        this.ownership = {
            1: 0,
            2: 0
        };
    }

    static addOwnership(playerID) {
        this.ownership[playerID] += 1;
    }

    static removeOwnership(playerID) {
        this.ownership[playerID] -= 1;
    }

    static getOwnership() {
        return this.ownership;
    }

    static setSideLength(len) {
        this.sideLength = len;
    }

    static setTextures() {
        this.textures = {
            standardTexture: PIXI.loader.resources.terrain.texture,
            p1Texture: PIXI.loader.resources.terrainP1.texture,
            p2Texture: PIXI.loader.resources.terrainP2.texture,
            sharedTexture: PIXI.loader.resources.terrainBoth.texture
        };
    }

    static getSpriteDetails(playerID) {
        let details = {texture: null};

        switch(playerID) {
        case 0:
            details.texture = this.textures.standardTexture;
            break;
        case 1:
            details.texture = this.textures.p1Texture;
            break;
        case 2:
            details.texture = this.textures.p2Texture;
            break;
        case 3:
            details.texture = this.textures.sharedTexture;
            break;
        }

        return details;
    }

    static setOverlayConstants(OVERLAY_CONSTANTS) {
        GraphicsPrimitive.setOpacity(OVERLAY_CONSTANTS.opacity);
        GraphicsPrimitive.setColors(OVERLAY_CONSTANTS.colors);
    }
}
