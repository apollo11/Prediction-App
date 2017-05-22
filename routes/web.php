<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('', function() {

  return redirect()->route('homepage', ['locale' => 'zh-hans']);
});

Route::get('/admin/login', 'Auth\LoginController@showLoginForm')->name('admin-login');
Route::get('/admin/register', 'Auth\RegisterController@showRegistrationForm')->name('admin-reg');


Route::get('/{locale}/', 'IndexController@index')->name('homepage');
Route::post('/api/v1/predict', 'PredictController@store');

Auth::routes();
Route::get('/admin/home', 'HomeController@index');
Route::get('/export/xls','HomeController@exportToExcel')->name('export-xls');
Route::get('/export/csv','HomeController@exportToCSV')->name('export-csv');

