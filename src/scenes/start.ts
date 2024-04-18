/* Start Scene: Plays a brief opening animation to introduce players to the game
 * before leading the player to the title scene
 */

import Phaser from "phaser";

export class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {}

  create() {
    // Test code for scene transition remove
    console.log("Start Scene Loaded");
  }

  update() {}
}
