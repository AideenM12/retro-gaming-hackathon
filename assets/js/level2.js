// Instantiate Phaser
let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

playerSprite = localStorage.getItem("playerSprite");

// preload assets
function preload () {
    this.load.image('floor', 'assets/tileset/frames/environment/floor/floor-group.png');
    this.load.image('acid-floor', 'assets/tileset/frames/environment/floor/acid-floor.png');
    this.load.image('single-floor', 'assets/tileset/frames/environment/floor/floor_5.png');
    this.load.image('door', 'assets/tileset/frames/environment/door/doors_leaf_closed.png');
    this.load.image('exit-door', 'assets/tileset/frames/environment/door/doors_all.png');
    this.load.image('skull', 'assets/tileset/frames/enemies/skull.png');
    this.load.image('blue-Flask-Big', 'assets/tileset/frames/environment/objects/flask_big_blue.png');
    this.load.image('yellow-potion', 'assets/tileset/frames/environment/objects/flask_yellow.png');
    this.load.image('long-column', 'assets/tileset/frames/environment/wall/wall_coulmn_base.png');
    this.load.image('heart', 'assets/tileset/frames/ui/ui_heart_full.png');
    this.load.image('column', 'assets/tileset/frames/environment/column/wall_column_mid.png');
    this.load.image('column-flipped', 'assets/tileset/frames/environment/column/wall_column_mid-flipped.png');
    this.load.image('column-red-banner', 'assets/tileset/frames/environment/wall/wall_banner_red.png');
    this.load.image('column-red-banner-flipped', 'assets/tileset/frames/environment/wall/wall_banner_red-flipped.png');
    this.load.image('background', 'assets/tileset/frames/environment/wall/level-background2.png');

    this.load.audio('door-close', 'assets/audio/door-creek-slam-egg.wav');
    this.load.audio('dungeon-2', 'assets/audio/Dungeon-2.mp3')

    this.load.spritesheet(
        'player',
        playerSprite,
        {
            frameWidth: 15,
            frameHeight: 21
        }
    )
};

// create assets
function create () {
    // level background & level audio
    levelBackground = this.add.image(0, 0, 'background').setScale(.3, .2).setOrigin(0, 0);
    levelMusic = this.sound.add('dungeon-2', {
        volume: 0.2,
        loop: true
    });
    levelMusic.play();

    // create level platforms
    platforms = this.physics.add.staticGroup();
    floor = platforms.create(((window.innerWidth / 2 - 217)), (window.innerHeight * 0.2), 'single-floor').setScale(8, 1).setOrigin(0, 0).refreshBody();
    exitFloor = platforms.create(20, ((window.innerHeight * 0.70) - 36), 'floor').setScale(2, 2).setOrigin(0, 0).refreshBody();
    floor2 = platforms.create(((window.innerWidth / 2) + 40), (window.innerHeight * 0.35), 'single-floor').setScale(8, 1).setOrigin(0, 0).refreshBody();
    floor3 = platforms.create(((window.innerWidth / 2) - 200), (window.innerHeight * 0.37), 'single-floor').setScale(6, 1).setOrigin(0, 0).refreshBody();
    floor4 = platforms.create((window.innerWidth * 0.60), ((window.innerHeight * 0.80) - 36), 'floor').setScale(3, 2).setOrigin(0, 0).refreshBody();
    verticalColumn = platforms.create(((window.innerWidth / 2 - 217)), (window.innerHeight * 0.2), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();
    verticalColumn2 = platforms.create(((window.innerWidth / 2 - 217) + (floor.width * 7)), (window.innerHeight * 0.2), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();
    verticalColumn3 = platforms.create((floor2.body.position.x * 1.05), (window.innerHeight * 0.7), 'single-floor').setScale(1.5, 9).setOrigin(0, 0).refreshBody();
    verticalColumn4 = platforms.create((floor2.body.position.x * 0.8), (window.innerHeight * 0.6), 'single-floor').setScale(1.5, 9).setOrigin(0, 0).refreshBody();
    movingPlatform = platforms.create(200, (window.innerHeight * 0.9), 'single-floor').setScale(3, 1).setOrigin(0, 0).refreshBody();
    this.tweens.add({
        targets: movingPlatform,
        x: 360,
        duration: 1200,
        yoyo: true,
        ease: 'Linear',
        repeat: -1
    })

    // kill floor
    kill = this.physics.add.staticGroup();
    killFloor = kill.create(0, ((window.innerHeight * 1) - 48), 'acid-floor').setScale(5, 3).setOrigin(0, 0).refreshBody();

    // add small animation to kill floor
    this.tweens.add({
        targets: killFloor,
        scaleY: 5,
        y: (window.innerHeight * 1) - 24,
        duration: 1500,
        yoyo: true,
        ease: 'Linear',
        repeat: -1
    });

    // static scene objects doors/skulls/ladders etc
    door = this.add.image(((window.innerWidth / 2) - 200), (window.innerHeight * 0.10), 'door').setScale(3).setOrigin(0, 0);
    doorCloseAudio = this.sound.play('door-close');

    column1 = this.add.image(53, (window.innerHeight * 0.61), 'column').setScale(3).setOrigin(0, 0);
    columnRedBanner = this.add.image(53, ((window.innerHeight * 0.57) + 10), 'column-red-banner').setScale(3).setOrigin(0, 0);
    column2 = this.add.image(290, (window.innerHeight * 0.61), 'column-flipped').setScale(3).setOrigin(0, 0);
    columnRedBanner2 = this.add.image(290, ((window.innerHeight * 0.57) + 10), 'column-red-banner-flipped').setScale(3).setOrigin(0, 0);

    // exit door
    exit = this.physics.add.staticGroup();
    exitDoor = exit.create(100, (window.innerHeight * 0.55), 'exit-door').setScale(3).setOrigin(0, 0).refreshBody();

    // ambient background objects
    yellowPotion = this.add.image(((window.innerWidth / 2) - 230), (window.innerHeight * 0.17), 'yellow-potion').setScale(2).setOrigin(0, 0);
    blueFlaskBig = this.add.image(((window.innerWidth / 2) - 220), (window.innerHeight * 0.17), 'blue-Flask-Big').setScale(2).setOrigin(0, 0);
    heart = this.add.image(50, ((window.innerHeight * 0.65) + 15), 'heart').setScale(1);
    this.tweens.add({
        targets: heart,
        scale: 1.5,
        duration: 2000,
        yoyo: true,
        ease: 'Linear',
        repeat: -1
    })
    // skull = this.add.image(40, (window.innerHeight * 0.9), 'skull').setScale(4).setOrigin(0, 0);

    // character
    player = this.physics.add.sprite(((window.innerWidth / 2) - 175), (window.innerHeight * 0.10), 'player');
    player.setOrigin(0, 0);
    player.setScale(3);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(
            'player', {
                start: 4,
                end: 7
            }
        ),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(
            'player', {
                start: 0,
                end: 3
            }
        ),
        frameRate: 5,
        repeat: -1
    });

    // add collision between player and platforms
    this.physics.add.collider(player, platforms);

    // overlap detection between player and killFloor
    this.physics.add.overlap(player, killFloor, death, null, this);

    // overlap detection between player and exitDoor
    this.physics.add.overlap(player, exitDoor, nextLevel, null, this);

    // create keyboard detection for up/down/right/left arrow
    cursors = this.input.keyboard.createCursorKeys();
};

// update game tick
function update () {

    if (cursors.left.isDown) {
        player.setVelocityX(-120);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(120);
        player.anims.play('right', true)
    } else if (cursors.down.isDown) {
        player.setVelocityY(400);
    } else {
        player.setVelocityX(0);
    };

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-350);
    };

};

// function to handle level win mechanic
function nextLevel (player, exitDoor) {
    console.log("win")
};

// function to handle level death mechanic
function death (player, killFloor) {
    this.registry.destroy();
    this.events.off();
    this.scene.restart();
};
