import "./style.css";
import Phaser from "phaser";
import * as WebFont from "webfontloader";

// Load all of the scenes from ./scenes folder
import { Menu } from "./scenes/menu";
import { Start } from "./scenes/start";
import { Options } from "./scenes/options";
import { Credits } from "./scenes/credits";
import { Inventory } from "./scenes/inventory";
import { Combat1 } from "./scenes/combat1";
import { Combat2 } from "./scenes/combat2";
import { Combat3 } from "./scenes/combat3";
import { Combat4 } from "./scenes/combat4";
import { PostCombat1 } from "./scenes/post_combat1";
import { PostCombat2 } from "./scenes/post_combat2";
import { PostCombat3 } from "./scenes/post_combat3";

// Scene key name should be file name lower case and spaced
let config = {
	type: Phaser.CANVAS,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
  scene: [Menu, Start, Options, Credits, Combat1, Combat2, Combat3, Combat4, PostCombat1, PostCombat2, PostCombat3,Inventory],
};

export const BSD = new Phaser.Game(config);

WebFont.load({
  google: {
    families: ['Silkscreen'],
  },
  active: function () {
    BSD.scene.start("Menu");
  },
});