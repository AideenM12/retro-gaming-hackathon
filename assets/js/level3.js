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
    this.load.image('column', 'assets/tileset/frames/environment/column/wall_column_mid.png');
    this.load.image('column-flipped', 'assets/tileset/frames/environment/column/wall_column_mid-flipped.png');
    this.load.image('column-red-banner', 'assets/tileset/frames/environment/wall/wall_banner_red.png');
    this.load.image('column-red-banner-flipped', 'assets/tileset/frames/environment/wall/wall_banner_red-flipped.png');
    this.load.image('background', 'assets/tileset/frames/environment/wall/level-background3.png')

    this.load.audio('door-close', 'assets/audio/door-creek-slam-egg.wav');
    this.load.audio('dungeon-3', 'assets/audio/Dungeon-3.mp3')

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
    levelMusic = this.sound.add('dungeon-3', {
        volume: 0.2,
        loop: true
    });
    levelMusic.play();

    // create level platforms
    platforms = this.physics.add.staticGroup();
    floor = platforms.create(0, (window.innerHeight * 0.65),'floor').setScale(2, 1).setOrigin(0, 0).refreshBody();
    floor2 = platforms.create(500, (window.innerHeight * 0.75), 'single-floor').setScale(32, 1.5).setOrigin(0, 0).refreshBody();
    floor3 = platforms.create(320, ((window.innerHeight * 0.30) + 25), 'single-floor').setScale(12, 1.5).setOrigin(0, 0).refreshBody();
    floor4 = platforms.create(((window.innerWidth / 2) + 50), ((window.innerHeight * 0.30) + 25), 'floor').setScale(2, 1.5).setOrigin(0, 0).refreshBody();
    floor5 = platforms.create(((window.innerWidth / 2) - 200), (window.innerHeight * 0.45), 'single-floor').setScale(12, 1.5).setOrigin(0, 0).refreshBody();
    floor6 = platforms.create((window.innerWidth * 0.70), (window.innerHeight * 0.50), 'floor').setScale(3, 1.5).setOrigin(0, 0).refreshBody();
    floor7 = platforms.create(((window.innerWidth * 0.70) - (floor6.width + 30)), (window.innerHeight * 0.65), 'single-floor').setScale(12, 1.5).setOrigin(0, 0).refreshBody();
    exitFloor = platforms.create((window.innerWidth * 0.70), (window.innerHeight * 0.90), 'floor').setScale(3, 2).setOrigin(0, 0).refreshBody();
    verticalColumn = platforms.create((0 + (floor.width * 2)), ((window.innerHeight * 0.30) + 25), 'single-floor').setScale(1, 20).setOrigin(0, 0).refreshBody();
    verticalColumn2 = platforms.create(((window.innerWidth / 2) - 200), 0, 'single-floor').setScale(1, 30).setOrigin(0, 0).refreshBody();
    verticalColumn3 = platforms.create(((window.innerWidth / 2) + 50), ((window.innerHeight * 0.25) + 15), 'single-floor').setScale(1, 30).setOrigin(0, 0).refreshBody();
    verticalColumn4 = platforms.create(((window.innerWidth * 0.95) - 10), ((window.innerHeight * 0.35) + 70), 'single-floor').setScale(1, 30).setOrigin(0, 0).refreshBody();
    verticalColumn5 = platforms.create(((window.innerWidth * 0.70) - 15), (window.innerHeight * 0.50), 'single-floor').setScale(1, 10).setOrigin(0, 0).refreshBody();

    verticalColumn5 = platforms.create(((window.innerWidth * 0.55) - 15), (window.innerHeight * 0.80), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();
    verticalColumn6 = platforms.create(((window.innerWidth * 0.57) - 15), (window.innerHeight * 0.82), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();
    verticalColumn7 = platforms.create(((window.innerWidth * 0.62) - 15), (window.innerHeight * 0.85), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();

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
    door = this.add.image(90, (window.innerHeight * 0.55), 'door').setScale(3).setOrigin(0, 0);
    doorCloseAudio = this.sound.play('door-close');

    column1 = this.add.image(((window.innerWidth * 0.75) + 48), (window.innerHeight * 0.86), 'column').setScale(3).setOrigin(0, 0);
    columnRedBanner = this.add.image(((window.innerWidth * 0.75) + 48), ((window.innerHeight * 0.81) + 10), 'column-red-banner').setScale(3).setOrigin(0, 0);
    column2 = this.add.image(((window.innerWidth * 0.75) + 285), (window.innerHeight * 0.86), 'column-flipped').setScale(3).setOrigin(0, 0);
    columnRedBanner2 = this.add.image(((window.innerWidth * 0.75) + 285), ((window.innerHeight * 0.81) + 10), 'column-red-banner-flipped').setScale(3).setOrigin(0, 0);

    // exit door
    exit = this.physics.add.staticGroup();
    exitDoor = exit.create((window.innerWidth * 0.80), (window.innerHeight * 0.80), 'exit-door').setScale(3).setOrigin(0, 0).refreshBody();

    // ambient background objects

    // character
    player = this.physics.add.sprite((90 + (door.width * 0.8)), (window.innerHeight * 0.55), 'player');
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

    //overlap detection between player and exitDoor
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
