<?php

namespace FootBall\Http\Controllers;

use FootBall\Predict;
use Illuminate\Http\Request;

class PredictController extends Controller
{
  public function __construct()
  {
    $this->middleware('guest');
  }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $predictValue = new Predict();
      $predictValue->username =$request->username;
      $predictValue->champion = $request->champion;
      $predictValue->first_place = $request->first_place;
      $predictValue->second_place = $request->second_place;
      $predictValue->third_place = $request->third_place;
      $predictValue->fingerprint = $request->fingerprint();
      $predictValue->lang = $request->lang;
      $save = $predictValue->save();

      if ($save) {
        return response()->json(['data' => $request, 'status' => '200']);
      }else {
        return response()->json(['status' => '400']);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
