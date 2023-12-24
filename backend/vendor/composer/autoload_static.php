<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb9389a7f2953c70bac96a6475946f42e
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb9389a7f2953c70bac96a6475946f42e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb9389a7f2953c70bac96a6475946f42e::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb9389a7f2953c70bac96a6475946f42e::$classMap;

        }, null, ClassLoader::class);
    }
}