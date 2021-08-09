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
    this.load.image('door', 'assets/tileset/frames/environment/door/doors_leaf_closed.png');
    this.load.image('exit-door', 'assets/tileset/frames/environment/door/doors_all.png');
    this.load.image('column', 'assets/tileset/frames/environment/column/wall_column_mid.png');
    this.load.image('column-flipped', 'assets/tileset/frames/environment/column/wall_column_mid-flipped.png');
    this.load.image('column-red-banner', 'assets/tileset/frames/environment/wall/wall_banner_red.png');
    this.load.image('column-red-banner-flipped', 'assets/tileset/frames/environment/wall/wall_banner_red-flipped.png');
    this.load.image('background', 'assets/tileset/frames/environment/wall/level-background4.png')

    this.load.audio('door-close', 'assets/audio/door-creek-slam-egg.wav');
    this.load.audio('dungeon-4', 'assets/audio/Dungeon-4-funky-ee.mp3')

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
    levelMusic = this.sound.add('dungeon-4', {
        volume: 0.2,
        loop: true
    });
    levelMusic.play();

    // create level platforms
    platforms = this.physics.add.staticGroup();
    floor = platforms.create(0, ((window.innerHeight * 1) - 280) ,'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor2 = platforms.create((window.innerWidth * 0.36), ((window.innerHeight * 0.2) - 48), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor3 = platforms.create((window.innerWidth * 0.80), ((window.innerHeight * 0.55) + 30), 'floor').setScale(2, 3).setOrigin(0, 0).refreshBody();
    floor4 = platforms.create((window.innerWidth * 0.4), (window.innerHeight *  0.9), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor5 = platforms.create((window.innerWidth * 0.9), (window.innerHeight * 0.23), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor6 = platforms.create((window.innerWidth * 0.7), (window.innerHeight * 0.23), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor7 = platforms.create(((floor.width * 3) + (floor2.width * - 2)), ((window.innerHeight * 0.4)), 'floor').setScale(1.5, 3).setOrigin(0, 0).refreshBody();
    
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
    door = this.add.image((window.innerWidth * 0.85), (window.innerHeight * 0.48), 'door').setScale(3).setOrigin(0, 0);
    doorCloseAudio = this.sound.play('door-close');

    column1 = this.add.image(((window.innerWidth / 1) - 308), (window.innerHeight * 0.18), 'column').setScale(3).setOrigin(0, 0);
    columnRedBanner = this.add.image(((window.innerWidth / 1) - 308), ((window.innerHeight * 0.13) + 10), 'column-red-banner').setScale(3).setOrigin(0, 0);
    column2 = this.add.image(((window.innerWidth / 1) - 70), (window.innerHeight * 0.18), 'column-flipped').setScale(3).setOrigin(0, 0);
    columnRedBanner2 = this.add.image(((window.innerWidth / 1) - 70), ((window.innerHeight * 0.13) + 10), 'column-red-banner-flipped').setScale(3).setOrigin(0, 0);

    // exit door
    exit = this.physics.add.staticGroup();
    exitDoor = exit.create(((window.innerWidth / 1) - 260), (window.innerHeight * 0.12), 'exit-door').setScale(3).setOrigin(0, 0).refreshBody();
    

    // character
    player = this.physics.add.sprite((window.innerWidth * 0.85) + (door.width / 2), (window.innerHeight * 0.5), 'player');
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

// function to handle level win (or in this case....trap) mechanic
function nextLevel (player, exitDoor) {
    localStorage.setItem("Rick Rolled", "You've been RickRolled! This was a trap ☠☠");
    window.location.href = '/game-over.html';
};

// function to handle level death mechanic
function death (player, killFloor) {
    this.registry.destroy();
    this.events.off();
    this.scene.restart();
};