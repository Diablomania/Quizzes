<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AnswerResource;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnswerResource::collection(
            Answer::query()->orderBy('id', 'desc')->paginate(100)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnswerRequest $request)
    {
        $data = $request->validated();
        $answer = Answer::create($data);
        return response(new AnswerResource($answer), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Answer $answer)
    {
        return new AnswerResource($answer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnswerRequest $request, Answer $answer)
    {
        $data = $request->validated();
        $answer->update($data);

        return new AnswerResource($answer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        $answer->delete();

        return response("", 204);
    }
}
