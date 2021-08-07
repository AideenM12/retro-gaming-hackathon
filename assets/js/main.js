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

let playerSprite = 'assets/tileset/frames/playerSprite/wiz-f-spritesheet.png';

function preload () {
    this.load.image('floor', 'assets/tileset/frames/environment/floor/floor-group.png');
    this.load.image('single-floor', 'assets/tileset/frames/environment/floor/floor_5.png');
    this.load.image('door', 'assets/tileset/frames/environment/door/doors_leaf_closed.png');
    this.load.image('exit-door', 'assets/tileset/frames/environment/door/doors_all.png');
    this.load.image('crate', 'assets/tileset/frames/environment/objects/crate.png');
    this.load.image('skull', 'assets/tileset/frames/enemies/skull.png');
    this.load.image('blue-Flask-Big', 'assets/tileset/frames/environment/objects/flask_big_blue.png');
    this.load.image('column', 'assets/tileset/frames/environment/column/wall_column_mid.png');
    this.load.image('column-flipped', 'assets/tileset/frames/environment/column/wall_column_mid-flipped.png');
    this.load.image('column-red-banner', 'assets/tileset/frames/environment/wall/wall_banner_red.png');
    this.load.image('column-red-banner-flipped', 'assets/tileset/frames/environment/wall/wall_banner_red-flipped.png');

    this.load.audio('door-close', 'assets/audio/door-creek-slam-egg.wav');

    this.load.spritesheet(
        'player',
        playerSprite,
        {
            frameWidth: 15,
            frameHeight: 21
        }
    )
};

function create () {
    // create level platforms
    platforms = this.physics.add.staticGroup();
    floor = platforms.create(0, ((window.innerHeight * 1) - 48) ,'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor2 = platforms.create((floor.width * 3.2), ((window.innerHeight * 0.7) - 48), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor3 = platforms.create(((floor.width * 3) + (floor2.width * 4)), ((window.innerHeight * 0.8) - 48), 'floor').setScale(1.5, 3).setOrigin(0, 0).refreshBody();
    floor4 = platforms.create(((floor.width * 3) + (floor3.width * 6)), (window.innerHeight * 0.5), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor5 = platforms.create(((floor.width * 3.5) + (floor4.width)), (window.innerHeight * 0.2), 'floor').setScale(3).setOrigin(0, 0).refreshBody();

    // static scene objects doors/skulls/ladders etc
    door = this.add.image(50, (window.innerHeight * 0.65), 'door').setScale(3).setOrigin(0, 0);
    doorCloseAudio = this.sound.play('door-close');

    column1 = this.add.image(((window.innerWidth / 2) - 240), (window.innerHeight * 0.16), 'column').setScale(3).setOrigin(0, 0);
    columnRedBanner = this.add.image(((window.innerWidth / 2) - 240), ((window.innerHeight * 0.10) + 10), 'column-red-banner').setScale(3).setOrigin(0, 0);
    column2 = this.add.image(((window.innerWidth / 2) - 10), (window.innerHeight * 0.16), 'column-flipped').setScale(3).setOrigin(0, 0);
    columnRedBanner2 = this.add.image(((window.innerWidth / 2) - 10), ((window.innerHeight * 0.10) + 10), 'column-red-banner-flipped').setScale(3).setOrigin(0, 0);

    exitDoor = this.add.image(((window.innerWidth / 2) - 200), (window.innerHeight * 0.10), 'exit-door').setScale(3).setOrigin(0, 0);
    
    singleFloorTile = this.add.image(50, (window.innerHeight * 0.75), 'single-floor').setScale(2, 1).setOrigin(0, 0);
    singleFloorTile2 = this.add.image((50 + (singleFloorTile.width * 4)), (window.innerHeight * 0.75), 'single-floor').setScale(2, 1).setOrigin(0, 0);

    // using crate image as pseudo-ladder image
    ladder = this.add.image((62 + (door.width / 2)), (door.height + (window.innerHeight * 0.71)), 'crate').setScale(2.5, 2).setOrigin(0, 0);
    ladder2 = this.add.image((62 + (door.width / 2)), (door.height + (window.innerHeight * 0.75)), 'crate').setScale(2.5, 2).setOrigin(0, 0);
    ladder3 = this.add.image((62 + (door.width / 2)), (door.height + (window.innerHeight * 0.79)), 'crate').setScale(2.5, 2).setOrigin(0, 0);
    ladder4 = this.add.image((62 + (door.width / 2)), (door.height + (window.innerHeight * 0.83)), 'crate').setScale(2.5, 2).setOrigin(0, 0);
    ladder5 = this.add.image((62 + (door.width / 2)), (door.height + (window.innerHeight * 0.87)), 'crate').setScale(2.5, 2).setOrigin(0, 0);

    // ambient background objects
    blueFlaskBig = this.add.image(40, (window.innerHeight * 0.92), 'blue-Flask-Big').setScale(2).setOrigin(0, 0);
    skull = this.add.image(40, (window.innerHeight * 0.9), 'skull').setScale(4).setOrigin(0, 0);

    // character
    player = this.physics.add.sprite((60 + (door.width / 2)), (window.innerHeight * 0.7), 'player');
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

    // create keyboard detection for up/down/right/left arrow
    cursors = this.input.keyboard.createCursorKeys();

};

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
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-350);
    }
};
