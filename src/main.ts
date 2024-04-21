import "./style.css";
import Phaser from "phaser";
import WebFont from "webfontloader";

import { Start } from "./scenes/startScene";
import { Menu } from "./scenes/menu";
import { Settings } from "./scenes/settings";
import { Credits } from "./scenes/credits";

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Menu, Credits, Settings, Start],
  playerClass: "default",
};

WebFont.load({
  google: {
    families: ["Bangers", "MedievalSharp", "Silkscreen"],
  },
  active: function () {
    new Phaser.Game(config);
  },
});
