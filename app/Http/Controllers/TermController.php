<?php

namespace FootBall\Http\Controllers;

use Illuminate\Http\Request;

class TermController extends Controller
{
    public function predict()
    {
      return view('predict.terms');
    }
}
