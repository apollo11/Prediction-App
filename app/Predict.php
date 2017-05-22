<?php

namespace FootBall;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Predict extends Model
{
  /**
   * @var string
   */
  protected $table = 'predicts';

  /**
   * @var array
   * The attributes that are mass assignable.
   */
  protected $fillable = [
    'username', 'champion', 'first_place', 'second_place', 'third_place'
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = [
    'created_at',
    'updated_at',
    'deleted_at'
  ];

  public function getPredictionData()
  {
    $value = DB::table('predicts')
      ->select('id', 'username', 'champion', 'first_place', 'second_place', 'third_place')
      ->get();

    return (array) $value;

  }

}
