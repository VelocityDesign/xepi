# xepi

(Pronounced ZEH-pee) An implementation of MAIL-E written in Typescript and
powered by Express + Deno

## Configuration

### Using .env (Recommended)

Here's a list of environment variables in the format of
`VARIABLE: DESCRIPTION (DEFAULT/RECOMMENDED)`. The name will have an asterisk
after it if the variable is required.

- `HOST`: The host on which Xepi should run. Synonymous to `DOMAIN`, but `HOST`
  is preferred. (localhost)
- `DOMAIN`: See host. Added for compatibility. (localhost)
- `PORT`: Number between 0 and 65535 for Xepi to run on. (80)
- `ROOT_URL`: Root URL for Xepi, where the interface/api will be accessible.
  [Important: Formatting Guidelines](https://github.com/velocitydesign/xepi#rooturl-formatting-guidelines)
  (/)
- `SERVE_WEBFINGER`: State if you want Xepi to serve `.well_known/webfinger`.
  Set to "false" if you want to disable and serve your own (non-updating)
  endpoint. (true)

#### rootURL Formatting Guidelines

While Xepi will do its best to determine the root URL of any provided string,
here are the best guidelines to get the desired result:

- Set `ROOT_URL` to `/` if you want to serve on root.
- Don't include a leading slash.
- Include a trailing slash.

## Running Locally

### For Testing

#### Deno

Just run `deno task run` and (assuming your
[configuration](https://github.com/velocitydesign/xepi#configuration) is fine),
you should see:

```
$ deno task run
No host specified... Using default host 'localhost'
No root URL specified... Using default root '/'
Starting Xepi at http://localhost:80/
Xepi is running at http://localhost:80/
```

Note: if you get an error such as...

```
error: Uncaught PermissionDenied: Permission denied (os error 13)
```

... Deno was unable to accquire sufficient permissions, or the port you're
attempting to use is unavailable. If the latter case is true, just prepend
`PORT=(port)` to the beggining of the command, and replace `(port)` with an open
port.

If all else fails, try sudo.

#### Docker/Podman

Instructions coming soon ;)

### For Development

This method will restart Xepi whenever a change is made to the code.

> Note: You need nodemon installed for this, and
> [here's why.](https://github.com/velocitydesign/xepi#why-nodemon)

Just run `deno task dev` and (assuming your config is fine), you should see:

```
$ deno task dev
No host specified... Using default host 'localhost'
No root URL specified... Using default root '/'
Starting Xepi at http://localhost:80/
Xepi is running at http://localhost:80/
```

Note: if you get an error such as...

```
error: Uncaught PermissionDenied: Permission denied (os error 13)
```

... Deno was unable to accquire sufficient permissions, or the port you're
attempting to use is unavailable. If the latter case is true, just prepend
`PORT=(port)` to the beggining of the command, and replace `(port)` with an open
port.

If all else fails, try sudo.

##### Why Nodemon?

As you may know, deno provides a built-in `--watch` flag that you can pass to it
that makes it reload on file change. However, for some reason, this flag messes
with port permissions and doesn't allow Xepi to run.
