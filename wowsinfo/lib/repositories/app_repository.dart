import 'storage/store_interface.dart';

/// This repository manages all cached & embedded data from the API.
/// It provides important data across the entire app.
/// In case the cached data (e.g. Personal Rating) is not available,
/// it will use the embedded json instead.
class AppRepository {
  /// The shared instance of the AppRepository.
  static final AppRepository instance = AppRepository._init();
  AppRepository._init();

  /// Database
  late final StoreInterface _database;
  void inject(StoreInterface database) {
    _database = database;
  }
}
