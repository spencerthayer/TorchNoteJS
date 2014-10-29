jQuery(document).ready(function () {
    var options = {
        onLoad: function () {
            $('#messages').text('Start typing password');
        },
        onKeyUp: function (evt) {
            $(evt.target).pwstrength("outputErrorList");
        }
    };
    $(':password').pwstrength(options);
});

(function ($) {
    "use strict";

    var options = {
            errors: [],
            // Options
            minChar: 16,
            errorMessages: {
                //password_to_short: "The passphrase is too short!",
                //same_as_username: "Your passphrase cannot be the same as your nickname!"
            },
            scores: [0, 30, 40, 60, 80, 100, 120, 140],
            verdicts: [
                       "WARNING: Passphrase Insecure!",
                       "Passphrase: Weak",
                       "Passphrase: Decent",
                       "Passphrase: Above Average",
                       "Passphrase: Strong",
                       "Passphrase: Very Strong",
                       "Passphrase: Awesome",
                       "Passphrase: Hard to Crack",
                       "Passphrase: Ni-Impossible to Crack"
                       ],
            showVerdicts: true,
            raisePower: 1,
            usernameField: "#nickInput",
            onLoad: undefined,
            onKeyUp: undefined,
            viewports: {
                progress: undefined,
                verdict: undefined,
                errors: undefined
            },
            // Rules stuff
            ruleScores: {
                wordNotEmail: -5,
                wordLength: -200,
                wordSimilarToUsername: -100,
                wordLowercase: 1,
                wordUppercase: 1,
                wordOneNumber: 1,
                wordThreeNumbers: 3,
                wordOneSpecialChar: 2,
                wordTwoSpecialChar: 2,
                wordUpperLowerCombo: 2,
                wordLetterNumberCombo: 2,
                wordLetterNumberCharCombo: 2
            },
            rules: {
                wordNotEmail: true,
                wordLength: true,
                 wordSimilarToUsername: true,
                wordLowercase: true,
                wordUppercase: true,
                wordOneNumber: true,
                wordThreeNumbers: true,
                wordOneSpecialChar: true,
                wordTwoSpecialChar: true,
                wordUpperLowerCombo: true,
                wordLetterNumberCombo: true,
                wordLetterNumberCharCombo: true
            },
            validationRules: {
                wordNotEmail: function (options, word, score) {
                    return word.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i) && score;
                },
                wordLength: function (options, word, score) {
                    var wordlen = word.length,
                        lenScore = Math.pow(wordlen, options.raisePower);
                    if (wordlen < options.minChar) {
                        lenScore = (lenScore + score);
                        options.errors.push(options.errorMessages.password_to_short);
                    }
                    return lenScore;
                },
                wordSimilarToUsername: function (options, word, score) {
                    var username = $(options.usernameField).val();
                    if (username && word.toLowerCase().match(username.toLowerCase())) {
                        options.errors.push(options.errorMessages.same_as_username);
                        return score;
                    }
                    return true;
                },
                wordLowercase: function (options, word, score) {
                    return word.match(/[a-z]/) && score;
                },
                wordUppercase: function (options, word, score) {
                    return word.match(/[A-Z]/) && score;
                },
                wordOneNumber : function (options, word, score) {
                    return word.match(/\d+/) && score;
                },
                wordThreeNumbers : function (options, word, score) {
                    return word.match(/(.*[0-9].*[0-9].*[0-9])/) && score;
                },
                wordOneSpecialChar : function (options, word, score) {
                    return word.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/) && score;
                },
                wordTwoSpecialChar : function (options, word, score) {
                    return word.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/) && score;
                },
                wordUpperLowerCombo : function (options, word, score) {
                    return word.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && score;
                },
                wordLetterNumberCombo : function (options, word, score) {
                    return word.match(/([a-zA-Z])/) && word.match(/([0-9])/) && score;
                },
                wordLetterNumberCharCombo : function (options, word, score) {
                    return word.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && score;
                }
            }
        },

        setProgressBar = function ($el, score) {
            var options = $el.data("pwstrength"),
                progressbar = options.progressbar,
                $verdict;

            var classList = [  
                "progress-bar-danger",
                "progress-bar-danger",
                "progress-bar-warning",
                "progress-bar-warning",
                "progress-bar-above-average",
                "progress-bar-above-average",
                "progress-bar-success",
                "progress-bar-success",
                "progress-bar-success",
                "progress-bar-success"
            ];

            var allClasses = "progress-bar-danger progress-bar-warning progress-bar-success";

            if (options.showVerdicts) {
                if (options.viewports.verdict) {
                    $verdict = $(options.viewports.verdict).find(".password-verdict");
                } else {
                    $verdict = $el.parent().find(".password-verdict");
                    if ($verdict.length === 0) {
                        //$verdict = $('<div class="password-verdict"></div>');
                        $verdict.insertBefore($el);
                    }
                }
            }

            var scoreIdx = 0;
            for (scoreIdx = 0; score > options.scores[scoreIdx]; scoreIdx++);

            progressbar.children().removeClass(allClasses);
            progressbar.children().addClass(classList[scoreIdx]);
            /* progressbar.children().css('width', 20 * (scoreIdx + 1) + '%' ); */
            progressbar.children().css('width', 12.5 * (scoreIdx + 1) + '%' );
            if (options.showVerdicts) {
                  $verdict.text(options.verdicts[scoreIdx]);
            }
        },

        calculateScore = function ($el) {
            var self = this,
                word = $el.val(),
                totalScore = 0,
                options = $el.data("pwstrength");

            $.each(options.rules, function (rule, active) {
                if (active === true) {
                    var score = options.ruleScores[rule],
                        result = options.validationRules[rule](options, word, score);
                    if (result) {
                        totalScore += result;
                    }
                }
            });
            setProgressBar($el, totalScore);
            return totalScore;
        },

        progressWidget = function () {
            return '<div class="progress" style="border-radius:0 0 4px 4px;">'
            +
            '<div class="progress-bar progress-bar-danger" role="progressbar" style="width:100%;">'
            +
            '<span class="password-verdict warning nobr">'
            +
            'WARNING: Passphrase Insecure!'
            +
            '</span></div>'
            +
            '</div>'
        },

        methods = {
            init: function (settings) {
                var self = this,
                    allOptions = $.extend(options, settings);

                return this.each(function (idx, el) {
                    var $el = $(el),
                        progressbar,
                        verdict;

                    $el.data("pwstrength", allOptions);

                    $el.on("keyup", function (event) {
                        var options = $el.data("pwstrength");
                        options.errors = [];
                        calculateScore.call(self, $el);
                        if ($.isFunction(options.onKeyUp)) {
                            options.onKeyUp(event);
                        }
                    });

                    progressbar = $(progressWidget());
                    /**/
                    if (allOptions.viewports.progress) {
                       // $(allOptions.viewports.progress).append(progressbar);
                    }
                    /**/
                    else {
                        progressbar.insertAfter($el);
                    }
                    /**/
                    //progressbar.find(".progress-bar").css("width", "100%");
                    $el.data("pwstrength").progressbar = progressbar;
                    /*
                    if (allOptions.showVerdicts) {
                        //verdict = $('<div class="password-verdict">' + allOptions.verdicts[0] + '</div>');
                        if (allOptions.viewports.verdict) {
                            $(allOptions.viewports.verdict).append(verdict);
                        } else {
                            verdict.insertAfter($el);
                        }
                    }
                    */
                    if ($.isFunction(allOptions.onLoad)) {
                        allOptions.onLoad();
                    }
                });
            },
            /** FIGURE THIS OUT LATER
            destroy: function () {
                this.each(function (idx, el) {
                    var $el = $(el);
                    $el.parent().find("div.password-verdict").remove();
                    $el.parent().find("div.progress-bar").remove();
                    $el.parent().find("ul.error-list").remove();
                    $el.removeData("pwstrength");
                });
            },
            */

            forceUpdate: function () {
                var self = this;
                this.each(function (idx, el) {
                    var $el = $(el),
                        options = $el.data("pwstrength");
                    options.errors = [];
                    calculateScore.call(self, $el);
                });
            },
            /**
            outputErrorList: function () {
                this.each(function (idx, el) {
                    var output = '<ul class="error-list">',
                        $el = $(el),
                        errors = $el.data("pwstrength").errors,
                        viewports = $el.data("pwstrength").viewports,
                        verdict;
                    $el.parent().find("ul.error-list").remove();

                    if (errors.length > 0) {
                        $.each(errors, function (i, item) {
                            output += '<li>' + item + '</li>';
                        });
                        output += '</ul>';
                        if (viewports.errors) {
                            $(viewports.errors).html(output);
                        } else {
                            output = $(output);
                            verdict = $el.parent().find("div.password-verdict");
                            if (verdict.length > 0) {
                                el = verdict;
                            }
                            output.insertAfter(el);
                        }
                    }
                });
            },
            */
            addRule: function (name, method, score, active) {
                this.each(function (idx, el) {
                    var options = $(el).data("pwstrength");
                    options.rules[name] = active;
                    options.ruleScores[name] = score;
                    options.validationRules[name] = method;
                });
            },

            changeScore: function (rule, score) {
                this.each(function (idx, el) {
                    $(el).data("pwstrength").ruleScores[rule] = score;
                });
            },

            ruleActive: function (rule, active) {
                this.each(function (idx, el) {
                    $(el).data("pwstrength").rules[rule] = active;
                });
            }
        };

    $.fn.pwstrength = function (method) {
        var result;
        if (methods[method]) {
            result = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            result = methods.init.apply(this, arguments);
        } else {
            $.error("Method " +  method + " does not exist on jQuery.pwstrength");
        }
        return result;
    };
}(jQuery));