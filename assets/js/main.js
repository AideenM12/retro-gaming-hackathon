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

function preload () {
    this.load.image('floor', 'assets/tileset/frames/environment/floor/floor-group.png')

    this.load.spritesheet(
        'player',
        'assets/tileset/frames/playerSprite/wiz-m-spritesheet.png',
        {
            frameWidth: 15,
            frameHeight: 21
        }
    )
};

function create () {
    // create level platforms
    platforms = this.physics.add.staticGroup();
    floor = platforms.create(0, ((window.innerHeight * 1) - 48), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor2 = platforms.create((floor.width * 3.2), ((window.innerHeight * 0.7) - 48), 'floor').setScale(3).setOrigin(0, 0).refreshBody();
    floor3 = platforms.create(((floor.width * 3) + (floor2.width * 4)), ((window.innerHeight * 0.8) - 48), 'floor').setScale(1.5, 3).setOrigin(0, 0).refreshBody();

    // character
    player = this.physics.add.sprite(0, floor.height, 'player');
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
    })
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
    })

    this.physics.add.collider(player, platforms);
};

function update () {
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.anims.play('right', true)
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }
};
