import "./style.css";
import Phaser from "phaser";

// Load all of the scenes from ./scenes folder
import { Start } from "./scenes/start";
import { Title } from "./scenes/title";
import { Options } from "./scenes/options";
import { Credits } from "./scenes/credits";
import { Combat } from "./scenes/combat";
import { PostCombat } from "./scenes/post_combat";
import { Inventory } from "./scenes/inventory";
// Scene key name should be file name lower case and spaced

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Start, Title, Options, Credits, Combat, PostCombat, Inventory],
};

export const BSD = new Phaser.Game(config);
