module.exports = shipit => {
    require('shipit-deploy')(shipit)

    shipit.initConfig({
        default: {
            deployTo: '/var/www/supfile',
            repositoryUrl: '',
            ignores: ['.git', 'node_modules', 'doc'],
            key: '',
            keepReleases: 2,
        },
        staging: {
            servers: 'http://localhost:3000/',
        },
    })

    shipit.on('deployed', function () {
        console.log('deploiement is over')
        shipit.start('after_deploy')
    })

    shipit.task('after_deploy', function () {
        shipit.remote('cd /var/www/supfile/current && npm install')
            .then(function (res) {
                console.log('Dependencies are installed')
                shipit.remote('cd /var/www/supfile/current && npm run apidoc_server')
                    .then(function (res) {
                        console.log('Documentation is generated')
                        shipit.remote('pm2 start /home/dev/ecosystem.config.js')
                            .then(function (res) {
                                console.log('Server is lauched')
                            })
                    })
            })
    })
}