# Generated by Django 4.2 on 2023-04-24 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Имя')),
            ],
            options={
                'verbose_name': 'Жанр',
                'verbose_name_plural': 'Жанры',
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('author', models.CharField(max_length=150, verbose_name='Автор')),
                ('image', models.CharField(blank=True, max_length=10000000, verbose_name='Изображение')),
                ('description', models.TextField(null=True, verbose_name='Описание')),
                ('language', models.CharField(blank=True, max_length=30, null=True, verbose_name='Язык')),
                ('year', models.CharField(max_length=10, null=True, verbose_name='Год издания')),
                ('genres', models.ManyToManyField(related_name='genres', to='app.genre', verbose_name='жанры')),
            ],
            options={
                'verbose_name': 'Книга',
                'verbose_name_plural': 'Книги',
            },
        ),
    ]