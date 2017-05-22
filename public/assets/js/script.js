/* Prediction Script */
//= require '../vendor/jquery.ui.touch-punch.min.js'

(function ($, window, document) {
    "use strict";
    
    // GLOBAL
    var resizeTimer,
        windowWidth,
        body = $('body');

    // ========= ON LOAD, IIFE
    (function checkWindowWidth() {

        // CHECK WINDOW WIDTH
        $(window).on('load, resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                checkWindowWidth();
            }, 250);
        });

        windowWidth = $(window).width();
        if (windowWidth <= 768) {
            body.addClass('is-mobile');
        } else {
            body.removeClass('is-mobile');
        }
        return windowWidth;

    }());

    // ON DOCUMENT READY....
    $(function () {
        var matchContainer = $('.game__match'),
            slot = $('.slot'),
            matchSlot = matchContainer.find(slot),
            finalFourSlot = $('.game__options-list').find('.finalist__container'),
            rankList = $('.ranking__list'),
            canDrag,
            selectedTeams = [],
            userInput = $('.form__input'),
            dropSelector = $('.is-droppable'),
            listPopup = $('.game__options-popup');

        selectedTeams[0] = '';
        selectedTeams[1] = '';
        selectedTeams[2] = '';
        selectedTeams[3] = '';

        showGuide('1');

        // MODAL ALERT
        modal('termsModal');
        function modal(id) {
            var modalID = $('#'+id);
            modalID.addClass('show');
            $('.js-modalCloseBtn').on('click', function() {
                modalID.removeClass('show');
            });
        }

    // ========= STEP 1: SELECT TEAMS

        // ON CLICK: SELECT MATCH WINNER
        matchSlot.on('click', function() {
            var self = $(this),
                teamName = self.attr('data-name'),
                matchNumber = self.parent().attr('data-match')-1;

            // Add classes
            if (!self.parent().hasClass('has-selection')) {
                self.addClass('is-selected')
                    .parent().addClass('has-selection');
            } else {
                var prevSelected = self.parent().find('.is-selected'),
                    prevSelectedTeam = prevSelected.attr('data-name');

                prevSelected.removeClass('is-selected');
                self.addClass('is-selected');
            }
            addToSelection(matchNumber, teamName);
            readTeamSelection(matchNumber, teamName);
            initDrag();
        });

        // Add/Remove Array Item 
        function addToSelection(i, name) {
            selectedTeams.splice(i, 1, name);
        }

        // Read Items in Array and Match Index of avaialble Slots
        function readTeamSelection(i, name) {
            // console.log(selectedTeams);
            $.each(finalFourSlot, function (index) {
                var self = $(this),
                    name = selectedTeams[index];

                // Add only If current index of Array is not empty
                if (name !== '') {
                    appendTemp(self, name);
                    self.addClass('is-filled is-added')
                        .attr({
                            'data-name': name,
                            'data-match': index + 1
                        });
                }
            });

            // Amend Team already ranked
            var teamMatchNumber = i + 1,
                rankedTeam = $('.ranking__container').filter('[data-match="' + teamMatchNumber + '"]');
            if (rankedTeam.length) {
                appendTemp(rankedTeam, name);
                rankedTeam.attr({'data-name': name});
            }
        }

        // Change Content of Slot
        function appendTemp(el, n) {
            var self = el,
                name = n,
                sortIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAIVBMVEUAAADznBLznBLznBLznBLznBLznBLznBLznBLznBLznBLOaTQhAAAACnRSTlMAAgQGdHuyucXtsb9rZwAAAEdJREFUCFtjYAACdwUGKGBd1QRjRq1aoQATXAUTjgIyIcIgQaiwF5i5QgDIzAIzVxowkAaQtCEZhmQFksXIzkFyJLLToR4CAMNLK5dd5fOkAAAAAElFTkSuQmCC",

                temp = '<div class="slot">' +
                            '<div class="slot__logo">' +
                            '<img src="/assets/images/logos/' + name.replace(/\s+/g, "-") + '.png" alt="' + name + '" />' +
                            '</div>' +
                            '<div class="slot__name">' +
                            name +
                            '</div>' +
                    '</div>';
            self.html('').append(temp);
        }


    // ========= STEP 2: ARRANGE RANKING
    
        // CHECK DnD
        function initDrag() {
            if (!canDrag) {
                if ($('.game__options').find('.is-filled').length == 4) {
                    showGuide('2');
                    scrollNext('.game__board-wrapper');
                    canDrag = true;
                    finalFourSlot.addClass('is-draggable');
                    $('.ranking__container').addClass('is-droppable');
                    drag();
                    showFinalFourRanking();
                }
            }
        }

        // ON DRAG & DROP, SORT
        function drag() {
            // console.log('drag');
            var draggable = '.is-draggable',
                dropzone = '.is-droppable';

            $(draggable).draggable({
                revert: true,
                revertDuration: 100,
                helper: "clone",
                addClasses: false,
                containment: $('.game__board-wrapper'),
                snap: true,
                snapMode: "inner",
            });
            $(dropzone).droppable({
                accept: draggable,
                tolerance: "pointer",
                addClasses: false,
                containment: $('.ranking__list'),
                drop: function (event, ui) {
                    var name = $(ui.draggable).attr('data-name'),
                        match = $(ui.draggable).attr('data-match');

                    // Disable drag to avoid possible duplicate
                    $(ui.draggable).addClass('was-ranked').draggable("disable");

                    if (!$(this).hasClass('is-ranked')) {
                        appendTemp($(this), name);
                        $(this).addClass('is-ranked')
                            .attr({
                                'data-name': name,
                                'data-match': match
                            })
                            // Disable droppable to avoid possible duplicate
                            .droppable("option", "disabled", true);
                    }

                    if ($('.ranking__list').find('.is-ranked').length == 4) {
                        $('.js-submit').removeAttr('disabled');
                        showGuide('3');
                        scrollNext('.game__form');
                    }
                }
            });
            $("#gameFinalRank").sortable({
                items: "> div",
                cursor: "move",
                containment: "parent",
            });
        }

        // ON CLICK/SELECT FINAL RANKING, Show list
        function showFinalFourRanking() { 
            $('.ranking__container').on('click', function() {

                // if ranked already, disable
                if (!$(this).hasClass('is-ranked')) {
                    listPopup.addClass('show');
                    body.addClass('has-popup');

                    // Clone
                    getClone('.game__options-list', listPopup);
                    
                    selectFinalFourRanking($(this));   
                }
            });
        }

        function selectFinalFourRanking(el) {   
            var a = $('#cloneOption').find('.slot');
            a.on('click', function() {
                var self = $(this).parent();
                var teamMatchNumber = self.attr('data-match');
                var name = self.attr('data-name');

                // if ranked already, disable click
                if (!self.hasClass('was-ranked')) {

                    // Hide Container
                    listPopup.removeClass('show');
                    body.removeClass('has-popup');

                    // Append
                    appendTemp(el, name);
                    el.attr({
                        'data-name': name,
                        'data-match': teamMatchNumber
                    });

                    // Mark items
                    el.addClass('is-ranked').droppable("option", "disabled", true);
                    $('.game__options').find('[data-match='+ teamMatchNumber +']')
                                        .addClass('was-ranked')
                                        .draggable("disable");

                    // If done
                    if ($('.ranking__list').find('.is-ranked').length == 4) {
                        $('.js-submit').removeAttr('disabled');
                        showGuide('3');
                        scrollNext('.game__form');
                    }
                }

            });
        }

        function getClone(a, b) {
            b.html('');
            $(a).clone().appendTo(b);
            b.find('.finalist__container').removeClass('ui-draggable-handle');
        }

        // SHOW GAME GUIDES
        function showGuide(s) {
            var currStep = s;
            var steps = document.querySelectorAll('.steps'),
                stepone = document.querySelectorAll('.step--one'),
                steptwo = document.querySelector('.step--two'),
                stepthree = document.querySelector('.step--three');

            switch (currStep) {
                case '1':
                    for (var i = 0; i < stepone.length; i++) {
                        stepone[i].classList.add('show');
                        stepone[i].querySelector('.step__arrow').classList.add('bounce');
                    }
                    // console.log('Step 1');
                    break;
                case '2':
                    resetSteps();
                    steptwo.classList.add('show');
                    steptwo.querySelector('.step__arrow').classList.add('bounce');
                    // console.log('Step 2');
                    break;
                case '3':
                    resetSteps();
                    stepthree.classList.add('show');
                    stepthree.querySelector('.step__arrow').classList.add('bounce');
                    // console.log('Step 3');
                    break;
            }

            function resetSteps() {
                for (var i = 0; i < steps.length; i++) {
                    steps[i].classList.remove('show');
                }
            }
        }

        // SCROLL TO NEXT STEP
        function scrollNext(el) {
            if (body.hasClass('is-mobile')) {
                $('html, body').animate({
                    scrollTop: $(el).offset().top - 150
                });
            }
        }

    // ========= STEP 3: FORM SUBMISSION

        // ON CLICK: Show Terms & Conditions
        $('.js-showTerms').on('click', function (e) {
            // scrollNext('.game__terms');
            // $('.game__terms').toggleClass('show');
            modal('termsModal');
            e.preventDefault();            
        });

        // ON SUBMIT
        $('.js-submit').on('click', function (e) {
            e.preventDefault();
            var self = $(this),
                spinner = self.find('.spinner'),
                btnText = self.find('.text'),
                username = userInput.val();

            // Check if username is not empty
            if (!username) {
                userInput.addClass('error');
            } else {
                btnText.addClass('hide');
                spinner.addClass('show');
                submitEntry(username, btnText, spinner);
            }
        });

        // ON BLUR
        userInput.on('blur', function () {
            if ($(this).val() !== '') {
                $(this).removeClass('error');
            }
        });

        // RESET / CLEAR
        function reset() {
            // Reset to default after submit
            // selectedTeams = [];
            // $('.is-selected').removeClass('is-selected');
            // $('.has-selected').removeClass('has-selected');
            // $('.is-ranked').removeClass('is-ranked');
            // $('.was-ranked').removeClass('was-ranked');
            userInput.val('');
            $('.js-submit').attr('disabled', true);
        }

        // AJAX SUBMIT
        function submitEntry(username, btnText, spinner) {
            var rankItem = $('.ranking__container').attr('data-name'),
                data = {
                    lang: $('html').attr('lang'),
                    username: username,
                    champion: $('.ranking__container:first-child()').attr('data-name'),
                    first_place: $('.ranking__container:nth-child(2)').attr('data-name'),
                    second_place: $('.ranking__container:nth-child(3)').attr('data-name'),
                    third_place: $('.ranking__container:nth-child(4)').attr('data-name')
                },
                // postUrl = 'http://192.168.0.110/api/v1/predict';
                postUrl = '/api/v1/predict';

            $.ajax({
                url: postUrl,
                type: "POST",
                async: false,
                data: data,
                dataType: "json",
                success: function (data) {
                    // $('.form__alert--success').addClass('show');
                    modal('formAlertModal');
                    loadingBtn();
                    reset();
                },
                error: function () {
                    $('.form__alert--error').addClass('show');
                    loadingBtn();
                }
            });

            function loadingBtn() {
                btnText.removeClass('hide');
                spinner.removeClass('show');
            }
        }

    });

}(jQuery, window, document));