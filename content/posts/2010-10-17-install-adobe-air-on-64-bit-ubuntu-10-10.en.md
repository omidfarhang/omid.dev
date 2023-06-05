---
title: Install Adobe AIR on 64-bit Ubuntu 10.10
date: 2010-10-17T08:59:00+00:00
layout: single
author_profile: true
url: 2010/10/17/install-adobe-air-on-64-bit-ubuntu-10-10/
tags:
  - Adobe
  - How to
lang: en
category: 
  - techblog
---
Right now Adobe AIR is only officially available for 32-bit Linux. But it does work on 64-bit Linux with the 32-bit compatibility libraries. There are several ways to install Adobe AIR on Linux. My preferred way on Ubuntu is to use the .deb package. However the .deb package distributed by Adobe can only be installed on 32-bit systems. Good news is that this can be easily fixed! To install the Adobe AIR .deb package on a 64-bit system just follow these steps: 

  1. [Download the Adobe AIR .deb file](http://get.adobe.com/air/) 
  2. In a terminal window go to the directory containing the adobeair.deb file 
  3. Create a tmp dir: 
    ```shell
mkdir tmp
```
    
    </li> 
    
      * Extract the deb file to the tmp dir: 
        ```shell
dpkg-deb -x adobeair.deb tmp
```
        
        </li> 
        
          * Extract the control files: 
            ```shell
dpkg-deb --control adobeair.deb tmp/DEBIAN
```
            
            </li> 
            
              * Change the Architecture parameter from “i386″ to “all”: 
                ```shell
sed -i "s/i386/all/" tmp/DEBIAN/control
```
                
                </li> 
                
                  * Repackage the deb file: 
                    ```shell
dpkg -b tmp adobeair_64.deb
```
                    
                    </li> 
                    
                    </ol> 
                    
                    Now you can install Adobe AIR on a 64-bit system! From the command line just do:
                    
                    ```shell
sudo dpkg -i adobeair_64.deb
```
                    
                    That’s it! Let me know if you have any questions.