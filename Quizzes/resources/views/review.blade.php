@extends('layout')

@section('title')Review @endsection

@section('main_content')

<h1>Comment Form</h1>

@if($errors->any())
    <div class="alert" alert-danger>
        <ul>
            @foreach($errors->all() as $error)
                <li> {{$error}} </li>
            @endforeach
        </ul>
    </div>
@endif

<form method="post" action="/review/check">
        @csrf
        <input type="email" name="email" id="email" placeholder="Enter your email" class="form-control"></br>
        <input type="text" name="subject" id="subject" placeholder="Enter subject" class="form-control"></br>
        <textarea name="message" id="message" class="form-control" placeholder="Enter your comment."></textarea></br>
        <button type="submit" class="btn btn-success">Send</button>
    </form>

    <h1>All comments</h1>
    @foreach($reviews as $el)
        <div class="alert alert-warning">
            <h3>{{ $el->subject }}</h3>
            <b>{{ $el->email }}</b>
            <p>{{ $el->message }}</p>
        </div>
    @endforeach
@endsection