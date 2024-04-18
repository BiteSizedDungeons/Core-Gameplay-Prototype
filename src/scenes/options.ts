/* Options Scene: Allow players to change the options of the game, including:
 * language. Should lead back to the title scene
 */

import Phaser from "phaser";

export class Options extends Phaser.Scene {
  constructor() {
    super("options");
  }

  preload() {}

  create() {
    // Test code for scene transition remove
    console.log("Options Scene Loaded");
  }

  update() {}
}
