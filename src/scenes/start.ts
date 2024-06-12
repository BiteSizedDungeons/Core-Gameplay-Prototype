const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const TEXT_COLOR = "#D3B02C";
const FONT = "Silkscreen";

import { BSD_Data, savePlayer } from "../prefabs/data_manager";

export class Start extends Phaser.Scene {
  english: any;
  not_english: any;
  korean: any;
  language: any;
  ability: any = [];
  weapon: any = [];
  armor: any = [];
  isStart: boolean = false;
  abilityRect: Phaser.GameObjects.Graphics[];
  weaponRect: Phaser.GameObjects.Graphics[];
  armorRect: Phaser.GameObjects.Graphics[];

  constructor() {
    super("Start");

    this.abilityRect = [];
    this.weaponRect = [];
    this.armorRect = [];
  }

  preload() {
    this.load.image("dragon", "BSD_Dead_Dragon.png");
    this.load.image("dragonLogo", "8_bit_dragon.png");
    this.load.json("english", "en.json");
    this.load.json("not_english", "lang.json");
    this.load.json("korean", "kr.json");
    this.load.audio("btnHov", "btn_hover.mp3");

    this.load.spritesheet("slash", "BSD_Slash.png", {
      frameWidth: 1024,
      frameHeight: 1024,
    });
  }

  create() {
    const hover = this.sound.add("btnHov");
    this.english = this.cache.json.get("english");
    this.not_english = this.cache.json.get("not_english");
    this.korean = this.cache.json.get("korean");
    this.setLanguage(); // set language

    console.log("Start");

    this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x141413
    );

    this.initText();
    this.initButton(hover);
    this.initRect();

    const class1 = this.add
      .text(1100, 650, "Start Game", {
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
      if (this.isStart) {
        /*let player = {
          "Ability": [this.ability[0], this.ability[1], this.ability[2], this.ability[3]],
          "Weapon": this.weapon[0],
          "Armor": this.armor[0]
        }*/
        const player: BSD_Data = {
          abilities: [
            this.ability[0].toLowerCase(),
            this.ability[1].toLowerCase(),
            this.ability[2].toLowerCase(),
            this.ability[3].toLowerCase(),
          ]
        };
        console.log(JSON.stringify(player));
        savePlayer(player);
        // send player to server

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
              this.scene.start("Combat");
            }
          }
        );
      }
    });
  }

  initText() {
    this.add.text(50, 50, "Ability(4):", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });

    this.add.text(50, 300, "Weapon(1):", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });

    this.add.text(50, 450, "Armor(1):", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });
  }

  initButton(hover: any) {
    const ability1 = "Attack",
      ability2 = "Heal",
      ability3 = "Empower",
      ability4 = "Soul link",
      ability5 = "Battle roar",
      ability6 = "Power boost",
      ability7 = "Dual strikes",
      ability8 = "Charged strikes";

    const weapon1 = "Sword",
      weapon2 = "Axe",
      weapon3 = "Bow",
      weapon4 = "Staff";

    const armor1 = "Light armor",
      armor2 = "Heavy armor",
      armor3 = "Chainmail",
      armor4 = "Robe";

    this.createAbilityButton(ability1, 250, 150, hover);
    this.createAbilityButton(ability2, 500, 150, hover);
    this.createAbilityButton(ability3, 750, 150, hover);
    this.createAbilityButton(ability4, 1000, 150, hover);
    this.createAbilityButton(ability5, 250, 230, hover);
    this.createAbilityButton(ability6, 500, 230, hover);
    this.createAbilityButton(ability7, 750, 230, hover);
    this.createAbilityButton(ability8, 1000, 230, hover);

    this.createWeaponButton(weapon1, 250, 400, hover);
    this.createWeaponButton(weapon2, 500, 400, hover);
    this.createWeaponButton(weapon3, 750, 400, hover);
    this.createWeaponButton(weapon4, 1000, 400, hover);

    this.createArmorButton(armor1, 250, 550, hover);
    this.createArmorButton(armor2, 500, 550, hover);
    this.createArmorButton(armor3, 750, 550, hover);
    this.createArmorButton(armor4, 1000, 550, hover);
  }

  createAbilityButton(text: any, x: any, y: any, hover: any) {
    const class1 = this.add
      .text(x, y, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "20px",
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
      if (!this.ability.includes(text)) this.ability.push(text);

      if (this.ability.length > 4) this.ability.shift();

      this.hideRect();
      this.showRect();

      this.startOrNot();
    });
  }

  createWeaponButton(text: any, x: any, y: any, hover: any) {
    const class1 = this.add
      .text(x, y, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "20px",
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
      this.weapon[0] = text;

      this.hideRect();
      this.showRect();

      this.startOrNot();
    });
  }

  createArmorButton(text: any, x: any, y: any, hover: any) {
    const class1 = this.add
      .text(x, y, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "20px",
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
      this.armor[0] = text;

      this.hideRect();
      this.showRect();

      this.startOrNot();
    });
  }

  initRect() {
    for (let i = 0; i < 8; i++) {
      this.abilityRect[i] = this.add.graphics();
    }
    this.createRect(this.abilityRect[0], 140, 130);
    this.createRect(this.abilityRect[1], 390, 130);
    this.createRect(this.abilityRect[2], 640, 130);
    this.createRect(this.abilityRect[3], 890, 130);
    this.createRect(this.abilityRect[4], 140, 210);
    this.createRect(this.abilityRect[5], 390, 210);
    this.createRect(this.abilityRect[6], 640, 210);
    this.createRect(this.abilityRect[7], 890, 210);

    for (let i = 0; i < 4; i++) {
      this.weaponRect[i] = this.add.graphics();
    }
    this.createRect(this.weaponRect[0], 140, 380);
    this.createRect(this.weaponRect[1], 390, 380);
    this.createRect(this.weaponRect[2], 640, 380);
    this.createRect(this.weaponRect[3], 890, 380);

    for (let i = 0; i < 4; i++) {
      this.armorRect[i] = this.add.graphics();
    }
    this.createRect(this.armorRect[0], 140, 530);
    this.createRect(this.armorRect[1], 390, 530);
    this.createRect(this.armorRect[2], 640, 530);
    this.createRect(this.armorRect[3], 890, 530);

    this.hideRect();
  }

  createRect(graphics: any, x: any, y: any) {
    graphics.lineStyle(1, 0xffffff, 1);
    graphics.strokeRect(x, y, 220, 50);
  }

  hideRect() {
    for (let i = 0; i < 8; i++) {
      this.abilityRect[i].visible = false;
    }

    for (let i = 0; i < 4; i++) {
      this.weaponRect[i].visible = false;
    }

    for (let i = 0; i < 4; i++) {
      this.armorRect[i].visible = false;
    }
  }

  showRect() {
    const ability1 = "Attack",
      ability2 = "Heal",
      ability3 = "Empower",
      ability4 = "Soul link",
      ability5 = "Battle roar",
      ability6 = "Power boost",
      ability7 = "Dual strikes",
      ability8 = "Charged strikes";

    const weapon1 = "Sword",
      weapon2 = "Axe",
      weapon3 = "Bow",
      weapon4 = "Staff";

    const armor1 = "Light armor",
      armor2 = "Heavy armor",
      armor3 = "Chainmail",
      armor4 = "Robe";

    for (let i = 0; i < this.ability.length; i++) {
      if (this.ability[i] == ability1) this.abilityRect[0].visible = true;
      else if (this.ability[i] == ability2) this.abilityRect[1].visible = true;
      else if (this.ability[i] == ability3) this.abilityRect[2].visible = true;
      else if (this.ability[i] == ability4) this.abilityRect[3].visible = true;
      else if (this.ability[i] == ability5) this.abilityRect[4].visible = true;
      else if (this.ability[i] == ability6) this.abilityRect[5].visible = true;
      else if (this.ability[i] == ability7) this.abilityRect[6].visible = true;
      else if (this.ability[i] == ability8) this.abilityRect[7].visible = true;
    }

    if (this.weapon[0] == weapon1) this.weaponRect[0].visible = true;
    else if (this.weapon[0] == weapon2) this.weaponRect[1].visible = true;
    else if (this.weapon[0] == weapon3) this.weaponRect[2].visible = true;
    else if (this.weapon[0] == weapon4) this.weaponRect[3].visible = true;

    if (this.armor[0] == armor1) this.armorRect[0].visible = true;
    else if (this.armor[0] == armor2) this.armorRect[1].visible = true;
    else if (this.armor[0] == armor3) this.armorRect[2].visible = true;
    else if (this.armor[0] == armor4) this.armorRect[3].visible = true;
  }

  setLanguage() {
    if (localStorage.getItem("language")!) {
      let get_lang = localStorage.getItem("language")!;
      if (get_lang === "not_english") {
        this.language = this.not_english;
      } else if (get_lang === "korean") {
        this.language = this.korean;
      } else {
        this.language = this.english;
      }
    } else {
      this.language = this.english;
    }
  }

  startOrNot() {
    if (
      this.ability.length == 4 &&
      this.weapon.length == 1 &&
      this.armor.length == 1
    )
      this.isStart = true;
  }

  update() {}
}
