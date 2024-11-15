import * as Phaser from "phaser";
import { BSD } from "../main";
import * as SaveState from "../prefabs/data_manager";

const BUTTON_COLOR = 0xfbbd55;
const BUTTON_HL_COLOR = 0xffe6bb;

const ITEM_COLOR = 0x1be4ff;
const ITEM_HL_COLOR = 0xbbf7ff;

let curSelection: "NONE" | "ABILITY1" | "ABILITY2" | "ABILITY3" | "ABILITY4" =
  "NONE";

class menuButton extends Phaser.GameObjects.Rectangle {
  label: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    text: string
  ) {
    super(scene, xPos, yPos, width, height, BUTTON_COLOR);
    this.label = new Phaser.GameObjects.Text(
      scene,
      xPos - text.length * 9.5,
      yPos - 16,
      text,
      {
        fontSize: "32px",
        color: "#000000",
      }
    );

    scene.add.existing(this);
    scene.add.existing(this.label);
    this.setInteractive();

    this.on("pointerover", () => {
      this.fillColor = BUTTON_HL_COLOR;
    });

    this.on("pointerout", () => {
      this.fillColor = BUTTON_COLOR;
    });
  }

  centerText() {
    this.label.setX(this.x - this.label.text.length * 9.5);
  }
}

class menuItem extends Phaser.GameObjects.Rectangle {
  label: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    text: string
  ) {
    super(scene, xPos, yPos, width, height, ITEM_COLOR);
    this.label = new Phaser.GameObjects.Text(
      scene,
      xPos - text.length * 9.5,
      yPos - 16,
      text,
      {
        fontSize: "32px",
        color: "#000000",
      }
    );

    scene.add.existing(this);
    scene.add.existing(this.label);
    this.setInteractive();

    this.on("pointerover", () => {
      this.fillColor = ITEM_HL_COLOR;
    });

    this.on("pointerout", () => {
      this.fillColor = ITEM_COLOR;
    });
  }
}

export class Inventory extends Phaser.Scene {
  player: SaveState.BSD_Data = { abilities: [] };
  inventory: SaveState.BSD_Data = { abilities: [] };

  gameWidth = BSD.config.width as number;
  gameHeight = BSD.config.height as number;

  abilitySlot1: menuButton | null = null;
  abilitySlot2: menuButton | null = null;
  abilitySlot3: menuButton | null = null;
  abilitySlot4: menuButton | null = null;

  constructor() {
    super("inventory");
  }

  preload() {}

  create() {
    // LINE TO REMOVE
    SaveState.initializeSave();

    this.player = SaveState.getPlayer();
    this.inventory = SaveState.getInventory();

    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xeeeeee
    );

    const exitButton = this.add.rectangle(
      this.gameWidth - 90,
      45,
      90,
      45,
      0xd9462a
    );
    this.add.text(this.gameWidth - 90 - 18 * 2, 45 - 15, "EXIT", {
      fontSize: "32px",
      color: "#000000",
    });

    exitButton.setInteractive();
    exitButton.on("pointerover", () => {
      exitButton.fillColor = 0xec6c54;
    });
    exitButton.on("pointerout", () => {
      exitButton.fillColor = 0xd9462a;
    });
    exitButton.on("pointerdown", () => {
      console.log("SWITCH");
    });

    this.initializeAbilitySlots();
  }

  update() {}

  initializeAbilitySlots() {
    this.abilitySlot1 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 - (2.25 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      this.player.abilities[0]
    );
    this.abilitySlot1.setInteractive();
    this.abilitySlot1.on("pointerdown", () => {
      this.selectSlot("ABILITY1");
    });

    this.abilitySlot2 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 - (0.75 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      this.player.abilities[1]
    );
    this.abilitySlot2.setInteractive();
    this.abilitySlot2.on("pointerdown", () => {
      this.selectSlot("ABILITY2");
    });

    this.abilitySlot3 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 + (0.75 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      this.player.abilities[2]
    );
    this.abilitySlot3.setInteractive();
    this.abilitySlot3.on("pointerdown", () => {
      this.selectSlot("ABILITY3");
    });

    this.abilitySlot4 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 + (2.25 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      this.player.abilities[3]
    );
    this.abilitySlot4.setInteractive();
    this.abilitySlot4.on("pointerdown", () => {
      this.selectSlot("ABILITY4");
    });
  }

  savePlayerEquipment() {
    SaveState.savePlayer(this.player);
    SaveState.saveInventory(this.inventory);
    console.log("Inventory Saving")
    return;
  }

  selectSlot(slot: "NONE" | "ABILITY1" | "ABILITY2" | "ABILITY3" | "ABILITY4") {
    if (curSelection == "NONE") {
      this.displayAbilityInventory();
    }
    curSelection = slot;
    console.log(curSelection);
  }

  swapEquipment(newItem: string) {
    let oldItem: string = "";
    let slotToModify: menuButton = this.abilitySlot1!;

    if (curSelection == "NONE") {
      return;
    } else if (curSelection == "ABILITY2") {
      slotToModify = this.abilitySlot2!;
    } else if (curSelection == "ABILITY3") {
      slotToModify = this.abilitySlot3!;
    } else if (curSelection == "ABILITY4") {
      slotToModify = this.abilitySlot4!;
    }

    oldItem = slotToModify.label.text;
    slotToModify.label.text = newItem;

    const equipKey = this.player.abilities.indexOf(oldItem);
    this.player.abilities[equipKey] = newItem;
    slotToModify.centerText();
    this.savePlayerEquipment();
    console.log(localStorage.getItem("player"));
  }

  clearMenu(menu: menuItem[]) {
    for (const item of menu) {
      item.label.destroy();
      item.destroy();
    }
    curSelection = "NONE";
    return menu;
  }

  displayAbilityInventory() {
    let selectionMenu: menuItem[] = [];

    let yPos = this.gameHeight / 10;
    for (let i = 0; i < this.inventory.abilities.length; i++) {
      // Creates a new menuItem for all abilities not equipped to players
      if (!this.player.abilities.includes(this.inventory.abilities[i])) {
        const curItem = new menuItem(
          this,
          (this.gameWidth * 1) / 4,
          yPos,
          this.gameWidth / 5,
          this.gameHeight / 20,
          this.inventory.abilities[i]
        );

        // Destroys all menu item when anyone is clicked
        curItem.setInteractive();
        curItem.on("pointerdown", () => {
          this.swapEquipment(curItem.label.text);
          selectionMenu = this.clearMenu(selectionMenu);
        });
        selectionMenu.push(curItem);

        yPos += (1.5 * this.gameHeight) / 20;
      }
    }

    const exitOption = new menuItem(
      this,
      (this.gameWidth * 1) / 4,
      yPos,
      this.gameWidth / 5,
      this.gameHeight / 20,
      "EXIT"
    );

    exitOption.setInteractive();
    exitOption.on("pointerdown", () => {
      selectionMenu = this.clearMenu(selectionMenu);
    });
    selectionMenu.push(exitOption);
  }
}
