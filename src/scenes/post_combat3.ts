/* Post Combat Scene: Menu scene that should play after player has finished combat
 * should have buttons that lead the player to the Inventory Scene and the
 * Combat Scene
 */

import Phaser from "phaser";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const TEXT_COLOR = "#D3B02C";
const FONT = "Silkscreen";

export class PostCombat3 extends Phaser.Scene {
  isStart: boolean = false;
  Player1: boolean = false;
  Player2: boolean = false;
  pRect: Phaser.GameObjects.Graphics[];
  constructor() {
    super("post combat3");
    this.pRect = [];
  }

  preload() {}

  create() {
    const hover = this.sound.add("btnHov");

    this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x141413
    );

    this.add.text(450, 50, "Hire an adventurer!", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });

    this.createP1Button(hover);
    this.createP2Button(hover);
    this.pRect[0] = this.add.graphics();
    this.pRect[1] = this.add.graphics();
    this.createRect(this.pRect[0], 80, 120);
    this.createRect(this.pRect[1], 80, 340);
    this.hideRect();




    const class1 = this.add
    .text(1100, 650, "Next", {
      fontFamily: FONT,
      color: TEXT_COLOR,
      fontSize: "30px",
    })
    .setOrigin(0.5);
  class1.setInteractive();
  class1.on("pointerover", () => {
    class1.setColor("#FFF");
    hover.play();
  });
  class1.on("pointerout", () => {
    class1.setColor(TEXT_COLOR);
  });
  class1.on("pointerdown", () => {


      this.add.rectangle(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        GAME_WIDTH,
        GAME_HEIGHT,
        0x0000000
      );

      this.add
        .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Level 1", {
          fontFamily: "Silkscreen",
          color: "#D3B02C",
          fontSize: "35px",
        })
        .setOrigin(0.5);

      this.cameras.main.fadeOut(
        1000,
        0,
        0,
        0,
        (_camera: any, progress: any) => {
          if (progress === 1) {
            if(this.isStart)
            this.scene.start("Combat4");
          }
        }
      );
    
  });
  }


  createP1Button(hover: any) {
    
    let text = "Advventurer1\n\n🪄: Attack    Battle roa    Power boost    Dual strikes\n🗡️: Sword\n🛡️: Light armor";
    
    const class1 = this.add
      .text(100, 150, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "25px",
      });
    class1.setInteractive();
    class1.on("pointerover", () => {
      class1.setColor("#FFF");
      hover.play();
    });
    class1.on("pointerout", () => {
      class1.setColor(TEXT_COLOR);
    });
    class1.on("pointerdown", () => {
      this.Player1 = true;
      this.Player2 = false;

      this.hideRect();
      this.showRect();

      this.startOrNot();
    });
  }

  createP2Button(hover: any) {
    
    let text = "Advventurer2\n\n🪄: Attack    Heal    Soul link    Charged strikes\n🗡️: Staff\n🛡️: Robe";
    
    const class1 = this.add
      .text(100, 370, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "25px",
      });
    class1.setInteractive();
    class1.on("pointerover", () => {
      class1.setColor("#FFF");
      hover.play();
    });
    class1.on("pointerout", () => {
      class1.setColor(TEXT_COLOR);
    });
    class1.on("pointerdown", () => {
      this.Player1 = false;
      this.Player2 = true;


      this.hideRect();
      this.showRect();

      this.startOrNot();
    });
  }

  createRect(graphics: any, x: any, y: any) {
    graphics.lineStyle(1, 0xffffff, 1);
    graphics.strokeRect(x, y, 900, 200);
  }

  showRect() {
    if(this.Player1)
      this.pRect[0].visible = true;
    else
      this.pRect[1].visible = true;
   
  }

  hideRect() {
    this.pRect[0].visible = false;
    this.pRect[1].visible = false;
  }

  startOrNot() {
    if (
      this.Player1 ||
      this.Player2 
    )
      this.isStart = true;
  }
  update() {}
}

