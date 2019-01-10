@extends('layouts.app')

@section('title', 'Start a vibe')

@section('content')
    <div class="container">
        <p>Start a vibe</p>
        <form method="POST" action="/vibe">
            @csrf

            @if($errors->any())
                <div>
                    @foreach($errors->all() as $error)
                        <p>{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <div>
                <input type="text" name="title" placeholder="Title" class="{{ $errors->has('title') ? 'error' : '' }}" value="{{ old('title') }}">
            </div>

            <div>
                <textarea name="description" cols="19" rows="5" placeholder="Description" class="{{ $errors->has('description') ? 'error' : '' }}">{{ old('description') }}</textarea>
            </div>

            <div>
                <input type="submit" name="create-vibe" value="Start">
            </div>
        </form>
    </div>
@endsection