/* Title Scene: Main title screen to the game, should have buttons that allow the player to
 * start the game, access the options, or to view credits of the game
 */

import Phaser from "phaser";

export class Title extends Phaser.Scene {
  constructor() {
    super("title");
  }

  preload() {}

  create() {
    // Test code for scene transition remove
    console.log("Title Scene Loaded");
  }

  update() {}
}
