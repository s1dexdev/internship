const regexpPhoneNumber = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

const regexpEmail = /^[a-zA-Z0-9]+(-?|\.?)[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,10}$/;

const regexpSite = /^https?:\/\/[a-zA-Z0-9]+-?[a-zA-Z0-9]+\.[a-z]{2,10}$/;

const regexpPassword = /[\w\Q!#$%&*+,-./:;<=>?@~"'{}()[\]\E]{6,25}/;

const regexpIpv4 =
    /((([0-2][0-5]{2}|[0-2][0-4]\d)|(\d{2})|(\d{1}))\.){3}(([0-2][0-5]{2}|[0-2][0-4]\d)|(\d{2})|(\d{1}))/;
