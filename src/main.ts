import "./style.css";
import Phaser from "phaser";

// Load all of the scenes from ./scenes folder
import { Start } from "./scenes/start";
import { Options } from "./scenes/options";
import { Credits } from "./scenes/credits";
import { Combat } from "./scenes/combat";
import { Inventory } from "./scenes/inventory";
// Scene key name should be file name lower case and spaced

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Start, Options, Credits, Combat, Inventory],
};

export const BSD = new Phaser.Game(config);