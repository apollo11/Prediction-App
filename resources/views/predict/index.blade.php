@extends('layouts.predict')
@section('content')

    <div class="header">
        <h1>{{ __('messages.football_prediction') }}</h1>
        <p align="center">{{ __('messages.football_title') }}</p>
    </div>

    <div class="game__board">
        <div class="game__matches game__matches--left">
            <div class="game__match" data-match="1">
                <div class="slot" data-name="{{ __('messages.team_one') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_one')).'.png') }}" alt="{{ __('messages.team_one') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_one') }}
                    </div>
                </div>
                <div class="slot" data-name="{{ __('messages.team_two') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_two')).'.png') }}" alt="{{ __('messages.team_two') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_two') }}
                    </div>
                </div>
            </div>
            <div class="game__match" data-match="2">
                <div class="slot" data-name="{{ __('messages.team_three') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_three')).'.png') }}" alt="{{ __('messages.team_three') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_three') }}
                    </div>
                </div>
                <div class="slot" data-name="{{ __('messages.team_four') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_four')).'.png') }}" alt="{{ __('messages.team_four') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_four') }}
                    </div>
                </div>
            </div>
            <div class="steps step--one">
                <div class="step__title">{{__('messages.instruction_step_1')}}</div>
                <div class="step__text">{{ __('messages.instruction_one') }}</div>
                <div class="step__arrow animated"></div>
            </div>
        </div>
        <div class="game__matches game__matches--right">
            <div class="game__match" data-match="3">
                <div class="slot" data-name="{{ __('messages.team_five') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_five')).'.png') }}" alt="{{ __('messages.team_five') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_five') }}
                    </div>
                </div>
                <div class="slot" data-name="{{ __('messages.team_six') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_six')).'.png') }}" alt="{{ __('messages.team_six') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_six') }}
                    </div>
                </div>
            </div>
            <div class="game__match" data-match="4">
                <div class="slot" data-name="{{ __('messages.team_seven') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_seven')).'.png') }}" alt="{{ __('messages.team_seven') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_seven') }}
                    </div>
                </div>
                <div class="slot" data-name="{{ __('messages.team_eight') }}">
                    <div class="slot__logo">
                        <img src="{{ asset('/assets/images/logos/'.str_replace(' ', '-', __('messages.team_eight')).'.png') }}" alt="{{ __('messages.team_eight') }}" />
                    </div>
                    <div class="slot__name">
                        {{ __('messages.team_eight') }}
                    </div>
                </div>
            </div>
            <div class="steps step--one">
                <div class="step__title">{{ __('messages.instruction_step_1') }}</div>
                <div class="step__text">{{ __('messages.instruction_one') }}</div>
                <div class="step__arrow animated bounce"></div>
            </div>
        </div>
        <div class="game__board-wrapper">
            <div class="game__ranking">
                <p class="title">{{ __('messages.predict') }}</p>
                <div class="ranking__label">
                    <div>
                        <img src="{{ asset('assets/images/trophy-gold.png') }}" alt="Gold">
                    </div>
                    <div>
                        <img src="{{ asset('assets/images/trophy-silver.png') }}" alt="Silver">
                    </div>
                    <div>
                        <img src="{{ asset('assets/images/trophy-bronze.png') }}" alt="Bronze">
                    </div>
                    <div>
                        <img src="{{ asset('assets/images/trophy-bronze-1.png') }}" alt="Bronze">
                    </div>
                </div>
                <div id="gameFinalRank" class="ranking__list">
                    <div class="ranking__container"></div>
                    <div class="ranking__container"></div>
                    <div class="ranking__container"></div>
                    <div class="ranking__container"></div>
                </div>
            </div>
            <div class="game__options">
                <p>{{ __('messages.direction') }}</p>
                <div class="game__options-list">
                    <div class="finalist__container"></div>
                    <div class="finalist__container"></div>
                    <div class="finalist__container"></div>
                    <div class="finalist__container"></div>
                </div>
            </div>
            <div id="cloneOption" class="game__options-popup">
               &nbsp;
            </div>
            <div class="steps step--two">
                <div class="step__title">{{ __('messages.instruction_step_2') }}</div>
                <div class="step__text">{{ __('messages.instruction_two') }}</div>
                <div class="step__arrow animated"></div>
            </div>
        </div>
        <div class="game__form">
            <p class="form__alert form__alert--error">{{ __('messages.submit_error') }}</p>
            <form action="#">
                <div class="form__item">
                    <input type="text" placeholder="{{ __('messages.enter_username') }}" class="form__input" value="{{ $user }}"/>
                    <p>{{ __('messages.register') }} <a href="http://orange88.com" title="Sign-up" target="_blank">{{ __('messages.click_here') }}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="#" class="js-showTerms">{{ __('messages.terms_condition_title') }}</a></p>
                </div>
                <div class="form__item">
                    <button role="button" class="form__submit js-submit" disabled>
                        <span class="text">{{ __('messages.submit') }}</span>
                        <span class="spinner"></span>
                    </button>
                </div>
            </form>
            <div class="steps step--three">
                <div class="step__title">{{ __('messages.instruction_step_3') }}</div>
                <div class="step__text">{{ __('messages.instruction_three') }}</div>
                <div class="step__arrow animated"></div>
            </div>
        </div>
        <!--<div class="game__terms">
            @include('predict.terms')
        </div>-->
    </div>

    <div id="termsModal" class="modal">
        <div class="modal__wrapper">
            <div class="modal__body">
                @include('predict.terms')
            </div>
            <button class="modal__close js-modalCloseBtn">
                <span class="modal__closeIcon">×</span>
                <span class="modal__closeLabel">Close</span>
            </button>
        </div>
    </div>
    <div id="formAlertModal" class="modal">
        <div class="modal__wrapper">
            <div class="modal__body">
                <p>{{ __('messages.success_message') }}</p>
            </div>
            <button class="modal__close js-modalCloseBtn">
                <span class="modal__closeIcon">×</span>
                <span class="modal__closeLabel">Close</span>
            </button>
        </div>
    </div>

@endsection
