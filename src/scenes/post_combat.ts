/* Post Combat Scene: Menu scene that should play after player has finished combat
 * should have buttons that lead the player to the Inventory Scene and the
 * Combat Scene
 */

import Phaser from "phaser";

export class PostCombat extends Phaser.Scene {
  constructor() {
    super("post combat");
  }

  preload() {}

  create() {
    // Test code for scene transition remove
    console.log("Post Combat Scene Loaded");
  }

  update() {}
}
