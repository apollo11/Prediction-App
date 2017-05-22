<?php

namespace FootBall\Http\Controllers;

use FootBall\Predict;
use Excel;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $predict = Predict::all();

      return view('home', ['item' => $predict]);
    }

    public function exportToExcel()
    {
      $now = Carbon::now();
      $predict = Predict::all();

      Excel::create('Prediction-'.$now , function($excel) use($predict) {
        $excel->sheet('Excel sheet', function($sheet) use($predict) {
          $sheet->fromArray($predict);
          $sheet->setStyle(array(
            'font' => array(
              'name'      =>  'Calibri',
              'size'      =>  10,
              'bold'      =>  true
            )
          ));
        });

      })->export('xls');
      return response()->file('full');
    }

  public function exportToCSV()
  {
    $now = Carbon::now();
    $predict = Predict::all();

    Excel::create('Prediction-'.$now , function($excel) use($predict) {
      $excel->sheet('Excel sheet', function($sheet) use($predict) {
        $sheet->fromArray($predict);
      });

    })->export('csv');
    return response()->file('full');
  }

}
