/// The base of all Wargaming API models, including status, error, data and meta.
abstract class WargamingAPI<T> {
  String? _status;
  WargamingAPIError? _error;

  T? data;
  WargamingAPIMeta? meta;

  /// The status can either be ok or error.
  bool get good => _status == 'ok' && _error == null;
  bool get error => _status == 'error' && _error != null;

  WargamingAPI.fromJson(Map<String, dynamic> json) {
    _status = json['status'] as String?;
    _error = json['error'] as WargamingAPIError?;
    data = json['data'] as T?;
    meta = json['meta'] as WargamingAPIMeta?;
  }
}

/// This is included only if something goes wrong.
/// It can be used to validate the response.
class WargamingAPIError {
  String? field;
  String? message;
  int? code;
  String? value;

  WargamingAPIError.fromJson(Map<String, dynamic> json) {
    field = json['field'] as String?;
    message = json['message'] as String?;
    code = json['code'] as int?;
    value = json['value'] as String?;
  }
}

/// Some APIs may have multiple pages so this is provided to help with pagination.
/// Pagination is required if pageTotal is provided.
class WargamingAPIMeta {
  int? count;
  int? pageTotal;
  int? total;
  int? limit; // by default 100
  int? page;

  /// Check if there are multiple pages available.
  bool get requirePagination => pageTotal != null && pageTotal! > 1;

  /// Check if there are more pages available.
  bool get hasMorePages {
    return pageTotal != null && page != null && page! < pageTotal!;
  }

  WargamingAPIMeta.fromJson(Map<String, dynamic> json) {
    count = json['count'] as int?;
    pageTotal = json['page_total'] as int?;
    total = json['total'] as int?;
    limit = json['limit'] as int?;
    page = json['page'] as int?;
  }
}
