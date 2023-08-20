<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ResultResource;
use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\UpdateResultRequest;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ResultResource::collection(
            Result::query()->orderBy('id', 'desc')->paginate(100)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResultRequest $request)
    {
        $data = $request->validated();
        $result = Result::create($data);
        return response(new ResultResource($result), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Result $result)
    {
        return new ResultResource($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResultRequest $request, Result $result)
    {
        $data = $request->validated();
        $result->update($data);

        return new ResultResource($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Result $result)
    {
        $result->delete();

        return response("", 204);
    }
}

