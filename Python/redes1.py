#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <sys/socket.h>
#include <netinet/ip6.h>
#include <netinet/icmp6.h>
#include <arpa/inet.h>

void help(char *prog) {
    printf("%s (c) 2013 by ss ssxnxn\n", prog);
    printf("Usage: %s [-s microseconds] -i interface victim-ip [other options]\n", prog);
    printf("-s microseconds: Delay between ICMP echo requests (default: no delay)\n");
    printf("-i interface: Network interface to send ICMP echo requests from\n");
    printf("victim-ip: Target IP address (IPv6)\n");
    printf("-m: Set multicast address if not specified\n");
    printf("-r: Use raw socket mode\n");
    exit(0);
}

int main(int argc, char *argv[]) {
    unsigned char *pkt = NULL, buf[161], tokemac[7];
    unsigned char *multicast6;
    int pkt_len = 0, sec = 0;
    char *interface = NULL;
    int raw_mode = 0;
    return 0;
}
