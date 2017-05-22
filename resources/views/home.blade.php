@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard </div>
                <div class="panel-body">
                    <!-- Table -->
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{{ __('messages.username') }}</th>
                            <th>Champion</th>
                            <th>First Place</th>
                            <th>Second Place</th>
                            <th>Third Place</th>
                            <th> Created Date</th>
                            <th> Updated Date</th>
                            <th><a href="{{ route('export-xls') }}"> Export to Excel</a></th>
                            <th><a href="{{ route('export-csv') }}"> Export to CSV</a></th>
                        </tr>
                        </thead>
                        @if( count($item) > 0 )
                            @foreach( $item as $value )
                            <tbody>
                            <tr>
                                <th scope="row">{{ $value->id }}</th>
                                <th scope="row">{{ $value->username }}</th>
                                <td>{{ $value->champion }}</td>
                                <td>{{ $value->first_place }}</td>
                                <td>{{ $value->second_place }}</td>
                                <td>{{ $value->third_place }}</td>
                                <td>{{ $value->created_at }}</td>
                                <td>{{ $value->updated_at }}</td>
                            </tr>
                            </tbody>
                             @endforeach
                        @else
                            <h1> Results not found </h1>
                        @endif
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
