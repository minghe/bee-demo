module.exports = function (grunt) {

    var ABCConfig = grunt.file.readJSON('abc.json');

    /**
     * 对每个具体任务进行配置
     */
    grunt.initConfig({
        path: ABCConfig.options.path,
        repoVersion: ABCConfig.version,

        // 指定打包目录
        buildBase: grunt.option('buildTo') || 'build',
        srcBase: 'src',

        clean: {
            build: [
                '<%=buildBase %>'
            ]
        },

        /**
         * 进行KISSY 打包
         * @link https://github.com/daxingplay/grunt-kpc
         */
        kpc: {
            main: {

                options: {
                    name: 'xcake',
                    path: '<%= srcBase %>',
                    flatten: false,
                    dest: '<%= buildBase %>',
                    entry: ['pages/*/*.js', 'components/*/*.js']
                },

                src: ['<%= srcBase %>/**/*.js', '!<%= srcBase %>/bower_components/**/*']
            }
        },


        flexcombo: {
            options: {
                target:'.',
                urls:'<%= path %>',
                port:'8888',
                servlet:'?',
                separator:',',
                charset:'utf8'
            },
            main: {}
        },

        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= srcBase %>',
                        src: ['**/*.css', '!**/*.less.css', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff'],
                        dest: '<%=buildBase %>'
                    }
                ]
            }

        },

        bower: {
            install: {}
        },

        less: {
            options: {
                paths: ['<%= srcBase %>', '<%= srcBase %>/bower_components']
            },

            dev: {
                options: {
                    sourceMap: true,
                    outputSourceFiles: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= srcBase %>',
                    dest: '<%= srcBase %>',
                    src: ['**/*.less', '!**/_*.less', '!bower_components/**'],
                    ext: '.less.css'
                }]
            },

            build: {
                files: [{
                    expand: true,
                    cwd: '<%= srcBase %>',
                    dest: '<%=buildBase %>',
                    src: ['app/**/*.less', 'pages/**/*.less', 'components/**/*.less', '!**/_*.less'],
                    ext: '.less.css'
                }]
            }
        },

        cssmin: {
            build: {
                expand: true,
                cwd: '<%=buildBase %>',
                src: ['**/*.css', '!**/*-min.css'],
                dest: '<%=buildBase %>',
                ext: '-min.css'
            }
        },

        uglify: {
            options: {
                mangle: {
                    except: ['KISSY']
                },
                preserveComments: 'some',
                'ascii-only': true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%=buildBase %>',
                    src: ['**/*.js', '!*-min.js'],
                    dest: '<%=buildBase %>',
                    ext: '-min.js'
                }]
            }
        },

        jshint: {
            options: {
                globals: 'KISSY',
                jshintrc: true
            },
            files: ['<%=srcBase %>/app/**/*.js', '<%=srcBase %>/pages/**/*.js', '<%=srcBase %>/components/**/*.js']
        },

        watch: {
            jshint: {
                files: ['<%= srcBase %>/app/**/*.js', '<%= srcBase %>/pages/**/*.js', '<%= srcBase %>/components/**/*.js'],
                tasks: ['jshint']
            },
            less: {
                files: ['<%= srcBase %>/**/*.less'],
                tasks: ['less:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['<%= srcBase %>/**/*.css', '<%= srcBase %>/**/*.js']
            }
        }
    });

    var GRUNT_BEGIN_TS = Date.now();
    var timeLine = [];

    grunt.registerTask('timer', 'Log time spent', function(name){
        if (name !== 'end') {
            timeLine.push({
                task: name,
                ts: Date.now()
            });
        }

        if (name === 'end') {
            timeLine.reduce(function(prev, current){
                var taskName = current.task.replace(/--/g, ':');
                console.log('   ' + taskName + '\t ' + (current.ts - prev.ts)/1000+'s');
                return current;
            }, {
                ts: GRUNT_BEGIN_TS
            });
            grunt.log.ok( 'Total took ' + ( Date.now() - GRUNT_BEGIN_TS ) / 1000 + 's' );
        }
    });

    function addTimerTask(tasks){
        tasks =  tasks.reduce(function(prev, current){
            prev.push(current);
            prev.push('timer:'+current.replace(/:/g, '--'));
            return prev;
        }, []);

        tasks.push('timer:end');
        return tasks;
    }

    /**
     * 载入使用到的通过NPM安装的模块
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-kpc');
    grunt.loadNpmTasks('grunt-flexcombo');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-bower-task');


    /**
     * 注册基本任务
     */
    grunt.registerTask('build', addTimerTask(['clean:build', 'jshint', 'kpc:main', 'copy:all',  'less:build', 'cssmin:build', 'uglify:build']));
    grunt.registerTask('styles', addTimerTask(['clean:build', 'less:build', 'cssmin:build']));

    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['less:dev', 'flexcombo', 'watch']);

};
