#include <stdio.h>
#include <sys/types.h>
#include <dirent.h>

int main()
{
  int ret;
  DIR *dp;
  ret = mkdir("./cc", 0777);
  if (ret < 0)
  {
    printf("create cc failure\n");
    return -1;
  }
  printf("create cc success\n");
  dp = opendir("./cc");
  if (dp == NULL)
  {
    printf("open cc failure\n");
    return -2;
  }
  printf("open cc success\n");
  closedir(dp);
  return 0;
}