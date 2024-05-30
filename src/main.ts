import "./style.css";
import Phaser from "phaser";

// Load all of the scenes from ./scenes folder
import { Menu } from "./scenes/menu";
import { Start } from "./scenes/start";
import { Options } from "./scenes/options";
import { Credits } from "./scenes/credits";
import { Combat } from "./scenes/combat";
import { Inventory } from "./scenes/inventory";
import { TestScene } from "./scenes/TestScene";
// Scene key name should be file name lower case and spaced

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Menu, Start, Options, Credits, Combat, Inventory, TestScene],
};

export const BSD = new Phaser.Game(config);