let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload () {
    this.load.image('wall', 'assets/tileset/frames/wall_goo.png')
    this.load.image('player', 'assets/tileset/frames/wizzard_m_hit_anim_f0.png');
};

function create () {
    sprite = this.add.image(400, 300, 'player');
    sprite.setOrigin(0, 0);
    sprite.setScale(1.5);

    wall = this.add.image(100, 100, 'wall');
    wall.setOrigin(0, 0);
    wall.setScale(3);
};

function update () {

};
