<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\QuestionResource;
use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QuestionResource::collection(
            Question::query()->orderBy('id', 'desc')->paginate(100)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request)
    {
        $data = $request->validated();
        $question = Question::create($data);
        return response(new QuestionResource($question), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return new QuestionResource($question);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        $data = $request->validated();
        $question->update($data);

        return new QuestionResource($question);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $quiz)
    {
        $question->delete();

        return response("", 204);
    }
}

