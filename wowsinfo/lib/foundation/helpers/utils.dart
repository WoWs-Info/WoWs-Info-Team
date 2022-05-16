import 'dart:math';

import 'package:flutter/material.dart';

class Utils {
  BuildContext context;
  Utils(this.context);
  static Utils of(BuildContext context) => Utils(context);

  /// A simple wrapper of Future.delayed
  static Future<void> delay(int duration) {
    return Future.delayed(Duration(milliseconds: duration));
  }

  int getItemCount(int maxItem, int minItem, int itemWidth) {
    final width = MediaQuery.of(context).size.width;
    return min(maxItem, max(width / itemWidth, minItem)).toInt();
  }

  double getItemWidth(int itemWidth, {int maxCount = 0, int margin = 0}) {
    final width = MediaQuery.of(context).size.width;
    // This is the max count so scale the width up
    final count = (width / itemWidth).floor();

    // Max count is to make sure it fills the entire width
    if (maxCount != 0 && count > maxCount) return (width / maxCount) - margin;
    return (width / count) - margin;
  }
}
