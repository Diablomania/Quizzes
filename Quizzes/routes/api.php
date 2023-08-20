<?php

use \App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\UserController;
use \App\Http\Controllers\Api\QuizController;
use \App\Http\Controllers\Api\QuestionController;
use \App\Http\Controllers\Api\AnswerController;
use \App\Http\Controllers\Api\ResultController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
        Route::get('/user', function (Request $request) {
            return $request->user();
    });
        Route::get('/quizzes', function (Request $request) {
        return $request->quizzes();
    });
    Route::get('/question', function (Request $request) {
        return $request->question();
    });
    Route::get('/answer', function (Request $request) {
        return $request->answer();
    });
    Route::get('/result', function (Request $request) {
        return $request->result();
    });
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::apiResource('/users', UserController::class);
        Route::apiResource('/quizzes', QuizController::class);
        Route::apiResource('/question', QuestionController::class);
        Route::apiResource('/answer', AnswerController::class);
        Route::apiResource('/result', ResultController::class);
    });


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
