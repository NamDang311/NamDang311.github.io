#!/bin/sh

#  clear_cache.sh
#  Sketch Cache Cleaner
#
#  Created by Sasha Prokhorenko on 2/6/17.
#  Copyright © 2017 Sasha Prokhorenko. All rights reserved.

# that's exectly the place where sketch save versions
#rm -rf /.DocumentRevisions-V100/.cs/{*,.*}

# looks like we need to remove all folders
rm -rf /.DocumentRevisions-V100/{*,.*}

exit 5
